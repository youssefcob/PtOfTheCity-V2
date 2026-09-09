<!-- Appointment-date field: a calendar dropdown on desktop, the same
     DropDownModal popup every other mobile field already uses on mobile.
     Days the selected clinic is closed on (schedule[day].off, or a date
     listed in its holidays) render disabled - purely permissive (nothing
     disabled beyond past/out-of-range dates) until a clinic/schedule is
     actually selected. -->
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import moment, { type Moment } from 'moment-timezone';
import DropDownModal from '~/sharedComponents/DropDownModal.vue';
import type { Schedule } from '~/types/types';

const props = defineProps<{
    label?: string;
    placeHolder?: string;
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    modelValue?: string; // MM-DD-YYYY, matches the rest of the form
    schedule?: Schedule | null;
    // Clinic.holidays is typed String[] (boxed) in types/types.ts, not string[]
    holidays?: (string | String | null)[] | null;
    minDate?: string; // MM-DD-YYYY, defaults to today
    maxDate?: string; // MM-DD-YYYY, defaults to +2 years
}>();

const emit = defineEmits(['update:modelValue', 'input']);

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const FORMAT = 'MM-DD-YYYY';

const isMobile = ref(false);
const checkMobile = () => { isMobile.value = window.innerWidth <= 500; };

const show = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const modal = ref<InstanceType<typeof DropDownModal> | null>(null);

const parseValue = (value: string | undefined | null): Moment | null => {
    if (!value) return null;
    const m = moment(value, FORMAT, true);
    return m.isValid() ? m : null;
};

const selected = ref<Moment | null>(parseValue(props.modelValue));
const viewMonth = ref<Moment>(selected.value ? selected.value.clone().startOf('month') : moment().startOf('month'));

watch(() => props.modelValue, (val) => {
    const parsed = parseValue(val);
    if (parsed && (!selected.value || !parsed.isSame(selected.value, 'day'))) {
        selected.value = parsed;
        viewMonth.value = parsed.clone().startOf('month');
    }
    if (!val) selected.value = null;
});

const displayValue = computed(() => (selected.value ? selected.value.format(FORMAT) : ''));

const minDate = computed(() => parseValue(props.minDate) ?? moment().startOf('day'));
const maxDate = computed(() => parseValue(props.maxDate) ?? moment().add(2, 'years').endOf('day'));

const isHoliday = (day: Moment) => {
    if (!props.holidays?.length) return false;
    return props.holidays.some((h) => {
        if (!h) return false;
        const parsed = moment(String(h));
        return parsed.isValid() && parsed.isSame(day, 'day');
    });
};

const isDayDisabled = (day: Moment) => {
    if (day.isBefore(minDate.value, 'day') || day.isAfter(maxDate.value, 'day')) return true;
    if (props.schedule) {
        const key = DAY_KEYS[day.day()];
        const daySchedule = props.schedule[key] as (typeof props.schedule)[typeof key] & { isOff?: boolean };
        // types/types.ts declares `off`, matching every other consumer
        // (Calender.vue, ClinicCard.vue, Clinic/Info.vue) - but the live API
        // actually serializes it as `isOff`, which silently breaks all of
        // those (off stays undefined => always "open"). Check both so this
        // field actually works regardless of which name is live.
        if (daySchedule?.off || daySchedule?.isOff) return true;
    }
    if (isHoliday(day)) return true;
    return false;
};

// 6 rows x 7 cols, padded with the trailing days of the previous/next month
// so the grid never reflows between months - padding cells are blank/inert.
const calendarCells = computed(() => {
    const start = viewMonth.value.clone().startOf('month').startOf('week');
    return Array.from({ length: 42 }, (_, i) => {
        const day = start.clone().add(i, 'days');
        return {
            day,
            inMonth: day.month() === viewMonth.value.month(),
            disabled: isDayDisabled(day),
            isToday: day.isSame(moment(), 'day'),
            isSelected: !!selected.value && day.isSame(selected.value, 'day'),
        };
    });
});

const monthLabel = computed(() => viewMonth.value.format('MMMM YYYY'));
const canGoPrevMonth = computed(() => viewMonth.value.clone().endOf('month').isAfter(minDate.value));
const canGoNextMonth = computed(() => viewMonth.value.clone().startOf('month').isBefore(maxDate.value));

const goPrevMonth = () => { if (canGoPrevMonth.value) viewMonth.value = viewMonth.value.clone().subtract(1, 'month'); };
const goNextMonth = () => { if (canGoNextMonth.value) viewMonth.value = viewMonth.value.clone().add(1, 'month'); };

const pick = (cell: { day: Moment; disabled: boolean; inMonth: boolean }) => {
    if (cell.disabled) return;
    selected.value = cell.day.clone();
    if (!cell.inMonth) viewMonth.value = cell.day.clone().startOf('month');
    emit('update:modelValue', displayValue.value);
    emit('input', displayValue.value);
    show.value = false;
    modal.value?.closeModal();
};

const clear = () => {
    selected.value = null;
    emit('update:modelValue', '');
    emit('input', '');
};

const defaultValue = (value: string) => {
    const parsed = parseValue(value);
    if (!parsed) return;
    selected.value = parsed;
    viewMonth.value = parsed.clone().startOf('month');
    emit('update:modelValue', displayValue.value);
    emit('input', displayValue.value);
};

const showDropDown = () => {
    if (props.disabled) return;
    show.value = true;
};

const openModal = () => {
    if (props.disabled) return;
    modal.value?.openModal();
};

let handleClickOutside: (e: Event) => void;

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    handleClickOutside = (e: Event) => {
        if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) show.value = false;
    };
    document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
    document.removeEventListener('click', handleClickOutside);
});

defineExpose({ clear, defaultValue });
</script>

<template>
    <div class="field-wrap">
        <label v-if="label" class="field-label">
            {{ label }}<span v-if="required" class="field-label-required">&nbsp;*</span>
        </label>

        <!-- Mobile: same popup every other mobile field uses -->
        <template v-if="isMobile">
            <DropDownModal ref="modal">
                <div class="calendar-panel">
                    <div class="calendar-header">
                        <button type="button" class="nav-btn" :disabled="!canGoPrevMonth" @click="goPrevMonth">‹</button>
                        <span class="month-label">{{ monthLabel }}</span>
                        <button type="button" class="nav-btn" :disabled="!canGoNextMonth" @click="goNextMonth">›</button>
                    </div>
                    <div class="weekday-row">
                        <span v-for="wd in WEEKDAY_LABELS" :key="wd">{{ wd }}</span>
                    </div>
                    <div class="day-grid">
                        <button
                            v-for="cell in calendarCells" :key="cell.day.format('YYYY-MM-DD')" type="button"
                            class="day-cell"
                            :class="{ 'out-of-month': !cell.inMonth, disabled: cell.disabled, today: cell.isToday, selected: cell.isSelected }"
                            :disabled="cell.disabled" @click="pick(cell)"
                        >{{ cell.day.date() }}</button>
                    </div>
                </div>
            </DropDownModal>

            <div :class="`booking-input-field has-static-label ${disabled ? 'disabled' : ''}`" @click="openModal">
                <span :class="{ placeholder: !displayValue }">{{ displayValue || placeHolder || 'Select date' }}</span>
                <span class="arrow-down">📅</span>
            </div>
        </template>

        <!-- Desktop: dropdown panel anchored under the field -->
        <template v-else>
            <div ref="dropdownRef" class="date-field-btn" @click="showDropDown">
                <div :class="`input-field has-static-label ${disabled ? 'disabled' : ''}`">
                    <span :class="{ placeholder: !displayValue }">{{ displayValue || placeHolder || 'Select date' }}</span>
                    <span class="arrow-down">📅</span>
                </div>

                <div class="calendar-container" v-if="show && !disabled" @click.stop>
                    <div class="calendar-panel">
                        <div class="calendar-header">
                            <button type="button" class="nav-btn" :disabled="!canGoPrevMonth" @click="goPrevMonth">‹</button>
                            <span class="month-label">{{ monthLabel }}</span>
                            <button type="button" class="nav-btn" :disabled="!canGoNextMonth" @click="goNextMonth">›</button>
                        </div>
                        <div class="weekday-row">
                            <span v-for="wd in WEEKDAY_LABELS" :key="wd">{{ wd }}</span>
                        </div>
                        <div class="day-grid">
                            <button
                                v-for="cell in calendarCells" :key="cell.day.format('YYYY-MM-DD')" type="button"
                                class="day-cell"
                                :class="{ 'out-of-month': !cell.inMonth, disabled: cell.disabled, today: cell.isToday, selected: cell.isSelected }"
                                :disabled="cell.disabled" @click="pick(cell)"
                            >{{ cell.day.date() }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss">
.field-wrap {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
}

.input-field,
.booking-input-field {
    &.has-static-label {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 4.5rem;
        padding: 0 1.25rem;
        border: 1px solid rgba(3, 41, 46, 0.2);
        border-radius: 0;
        background: #ffffff;
        cursor: pointer;
        font-family: $font-poppins;
        font-size: 1.15rem;
        color: $primary-700;

        .placeholder {
            color: rgba(3, 41, 46, 0.45);
        }

        .arrow-down {
            font-size: 1rem;
            flex-shrink: 0;
        }

        &.disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        @media screen and (max-width: 800px) {
            height: 4.375rem;
            padding: 0 1rem;
            border: 1.5px solid rgba(3, 41, 46, 0.13);
        }
    }
}

.date-field-btn {
    position: relative;
}

.calendar-container {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    z-index: 1000;
    border-radius: 0.75rem;
    border: 1px solid $blue;
    background-color: $white;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.calendar-panel {
    padding: 1rem;
    width: 30rem;
    max-width: 90vw;
    // .calendar-container already sets this for desktop, but the mobile
    // popup renders this panel straight inside DropDownModal's <dialog>
    // (no .calendar-container wrapper there) - without its own opaque
    // background it shows through to the dialog's own translucent fill.
    background-color: $white;
    border-radius: 0.75rem;
}

// DropDownModal's own ::backdrop is fully transparent (rgba(...,0)) by
// default, shared by every mobile dropdown in the app - :deep() reaches into
// this specific DropDownModal instance's <dialog> without touching any
// other field's popup.
:deep(dialog::backdrop) {
    background-color: rgba(44, 50, 51, 0.5);
}

.calendar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    .month-label {
        font-family: $font-poppins;
        font-weight: 600;
        color: $primary-700;
    }

    .nav-btn {
        width: 2rem;
        height: 2rem;
        border: none;
        border-radius: 50%;
        background: none;
        font-size: 1.25rem;
        color: $primary-700;
        cursor: pointer;

        &:hover:not(:disabled) {
            background-color: $surface-mint;
        }

        &:disabled {
            opacity: 0.25;
            cursor: not-allowed;
        }
    }
}

.weekday-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 0.25rem;

    span {
        text-align: center;
        font-size: 1rem;
        font-weight: 600;
        color: rgba(3, 41, 46, 0.5);
    }
}

.day-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.day-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border: none;
    border-radius: 50%;
    background: none;
    font-family: $font-poppins;
    font-size: 1.2rem;
    color: $primary-700;
    cursor: pointer;

    &:hover:not(:disabled) {
        background-color: $surface-mint;
    }

    &.out-of-month {
        color: rgba(3, 41, 46, 0.25);
    }

    &.today {
        font-weight: 700;
    }

    &.selected {
        background-color: $primary-base;
        color: #ffffff;
    }

    &.disabled {
        color: rgba(3, 41, 46, 0.2);
        cursor: not-allowed;
        text-decoration: line-through;
    }
}
</style>

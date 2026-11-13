// Clinics that carry a network affiliation badge on their /clinic/<slug> page.
// Matched on the clinic's display name (as returned by /web/clinic/<slug>).

// Mount Sinai Trusted Rehabilitation Provider Network - only live at these clinics.
export const MOUNT_SINAI_CLINICS = [
  'Cobble Hill',
  'Greenpoint',
  'Midtown',
  'Riverdale',
  'Sunset Park',
] as const;

// HSS Rehabilitation National Network - only live at these clinics.
export const HSS_CLINICS = ['Bensonhurst'] as const;

export const isMountSinaiClinic = (name?: string | null) =>
  !!name && (MOUNT_SINAI_CLINICS as readonly string[]).includes(name);

export const isHssClinic = (name?: string | null) =>
  !!name && (HSS_CLINICS as readonly string[]).includes(name);

// Shared logo assets (Cloudinary).
export const MOUNT_SINAI_NETWORK_LOGO =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1788793532/copy_of_mountsinailogo_llja3d.webp';
export const HSS_NETWORK_LOGO =
  'https://res.cloudinary.com/dzilc11zf/image/upload/v1793296151/HSS_wdffta.webp';

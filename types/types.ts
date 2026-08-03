

export interface Service {
    id: string;
    path: string;
    title: string;
    description: string;
    listHeader: string;
    list: string[];
    clinics: Clinic[];
    slug: string;

}



interface Tag {
    id: number
    title: string
    pivot: {
        blog_id: number
        tag_id: number
    }
}

export type Blog = {
    id: number
    title: string
    metas: string // JSON string
    html_content: string
    staff_id: number
    is_highlighted: number
    main_image: string
    created_at: string
    updated_at: string
    staff: Staff
    tags: Tag[];
    description: string;
    main_image_alt: string;
    slug: string;
}
type Links = {
    url: string | null;
    label: string;
    active: boolean;
}

export type PaginatedResponse<T> = {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Links[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}


export interface TrustedBy {
    id: number;
    name: string;
    path: string;
}


export type Nav = {
    clinics: HttpClinics,
    services: string[]
}

export type Career = {
    title: string;
    description: string;
}

export interface Staff {
    id: number;
    title: string;
    first_name: string;
    last_name: string;
    occupation: string;
    image: string;
    brief: string;
    bio: string;
    full_name: string;
    slug: string;
}

export type Insurance = {
    id: number;
    title: string;
    description: string;
    path: string;
};


export type Media = {
    id: number,
    clinic_id: number,
    title: null | string,
    media_type: "image" | "video" | "audio",
    path: string,
}
type day = {
    start: string,
    end: string,
    off: boolean,
}
export type Schedule = {
    monday: day,
    tuesday: day,
    wednesday: day,
    thursday: day,
    friday: day,
    saturday: day,
    sunday: day,
};

export type HttpClinics = {
    [key: string]: Clinic[];
};

export type Campaign = {
    id: number,
    title: string,
    slogans: string[],
    images: {
        path: string
    }[],
    slogans_animation: string,
    animation_interval: number,
    buttonLink: string,
    buttonText: string,
    animation: string
};

export type ClinicPosition = {
    position: {
        lat: string | number;
        lng: string | number;
    };
    name: string;
    address: string;
};
export type Clinic = {
    // [key: string]:[
    // {
    id: number,
    name: string,
    street_address: string,
    city: string,
    state: string,
    zip_code: string,
    long: string,
    lat: string,
    location_link: string | null,
    header: string,
    summary: string,
    phone: string,
    capacity: number,
    rating: number,
    // number_of_ratings: number | string | null,
    holidays: String[] | null,
    schedule: Schedule,
    media: Media[],
    services: Service[],
    place_id: string,
    reviews: Review[],
    user_ratings_total: number,
    image: string,
    slug: string,
    // }
    // ]
}

export type WhoWeAre = {
    clinics: number,
    successful_cases: number,
    employees: number,
    our_story: string,
    our_technique: string,
    mission: string,
    vision: string,
}

export type Content = {
    title: string,
    body: WhoWeAre
}

export type Review = {
    author_name: string,
    author_url: string,
    language: string,
    original_language: string,
    profile_photo_url: string,
    rating: number,
    relative_time_description: string,
    text: string,
    time: number,
    translated: boolean,
};

export type HttpReview = {
    rating: number,
    reviews: Review[],
    user_ratings_total: number,

}


export type Job = {
    id: number;
    title: string;
    description: string;
    isAvailable: number;
    created_at: string;
    updated_at: string;
}


export interface Author {
    title: string;
    first_name: string;
    last_name: string;
}



export interface BlogFilters {
    authors: Author[];
    tags: Tag[];
}

export type User = {
    id: number;
    is_verified: boolean;
    first_name: string;
    last_name: string;
    email: string;
}

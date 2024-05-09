export type TSortBy = "relevant" | "recent";

export type TPageChangeDirection = "previous" | "next";

export type JobItem = {
    id: number;
    title: string;
    company: string;
    daysAgo: number;
    badgeLetters: string;
    relevanceScore: number;
};

export type JobItemExpanded = JobItem & {
    salary: string;
    duration: string;
    location: string;
    reviews: string[];
    companyURL: string;
    coverImgURL: string;
    description: string;
    qualifications: string[];
};

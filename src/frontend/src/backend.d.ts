import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Time = bigint;
export interface Booking {
    id: string;
    service: ServiceType;
    name: string;
    email: string;
    message: string;
    address: string;
    timestamp: Time;
    phone: string;
}
export interface Review {
    id: string;
    service: ServiceType;
    date: Time;
    name: string;
    reviewText: string;
    approvalStatus: boolean;
    rating: bigint;
    photo?: ExternalBlob;
}
export enum ServiceType {
    carpetUpholstery = "carpetUpholstery",
    commercialCleaning = "commercialCleaning",
    other = "other",
    pestControl = "pestControl",
    residentialDeepCleaning = "residentialDeepCleaning"
}
export interface backendInterface {
    /**
     * / Add a booking to the system.
     */
    addBooking(name: string, phone: string, email: string, service: ServiceType, address: string, message: string): Promise<void>;
    /**
     * / Add a review to the system.
     */
    addReview(name: string, service: ServiceType, rating: bigint, reviewText: string, photo: ExternalBlob | null): Promise<void>;
    /**
     * / Approve a review for use in system.
     */
    approveReview(reviewId: string): Promise<void>;
    /**
     * / Directly delete a specific review.
     */
    deleteReview(reviewId: string): Promise<void>;
    /**
     * / Query all approved reviews regardless of service.
     */
    getAllApprovedReviews(): Promise<Array<Review>>;
    /**
     * / Expose all bookings in the system.
     */
    getAllBookings(): Promise<Array<Booking>>;
    getApprovedReviewsByService(service: ServiceType): Promise<Array<Review>>;
    /**
     * / Get a MODIFIED list of up to 5 featured reviews, for use in carousels.
     */
    getFeaturedReviews(): Promise<Array<Review>>;
    /**
     * / Expose all reviews for a specific rating.
     */
    getReviewsByRating(rating: bigint): Promise<Array<Review>>;
    /**
     * / Update a specific review with new information.
     */
    updateReview(reviewId: string, name: string, service: ServiceType, rating: bigint, reviewText: string, photo: ExternalBlob | null): Promise<void>;
}

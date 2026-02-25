import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Booking {
    id: string;
    service: ServiceType;
    propertyType: PropertyType;
    date: string;
    name: string;
    time: string;
    address: string;
    notes: string;
    timestamp: Time;
    phone: string;
}
export interface Review {
    id: string;
    service: ServiceType;
    date: Time;
    name: string;
    reviewText: string;
    rating: bigint;
}
export enum PropertyType {
    commercial = "commercial",
    twoBhk = "twoBhk",
    villa = "villa",
    squareFeet = "squareFeet",
    threeBhk = "threeBhk",
    oneBhk = "oneBhk"
}
export enum ServiceType {
    carpetUpholstery = "carpetUpholstery",
    other = "other",
    painting = "painting",
    deepCleaning = "deepCleaning",
    pestControl = "pestControl"
}
export interface backendInterface {
    addBooking(name: string, phone: string, address: string, service: ServiceType, propertyType: PropertyType, date: string, time: string, notes: string): Promise<void>;
    /**
     * / Add a review to the system.
     */
    addReview(name: string, service: ServiceType, rating: bigint, reviewText: string): Promise<void>;
    /**
     * / Delete a review.
     */
    deleteReview(reviewId: string): Promise<void>;
    /**
     * / Get all bookings.
     */
    getAllBookings(): Promise<Array<Booking>>;
    /**
     * / Get all reviews.
     */
    getAllReviews(): Promise<Array<Review>>;
    /**
     * / Get featured reviews (up to 5).
     */
    getFeaturedReviews(): Promise<Array<Review>>;
    /**
     * / Get reviews by rating.
     */
    getReviewsByRating(rating: bigint): Promise<Array<Review>>;
    /**
     * / Get approved reviews by service.
     */
    getReviewsByService(service: ServiceType): Promise<Array<Review>>;
    /**
     * / Get WhatsApp link for booking.
     */
    getWhatsAppBookingLink(service: ServiceType): Promise<string>;
    /**
     * / Update a review.
     */
    updateReview(reviewId: string, name: string, service: ServiceType, rating: bigint, reviewText: string): Promise<void>;
}

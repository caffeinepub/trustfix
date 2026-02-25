import MixinStorage "blob-storage/Mixin";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";



actor {
  include MixinStorage();

  type ServiceType = {
    #pestControl;
    #deepCleaning;
    #carpetUpholstery;
    #painting;
    #other;
  };

  type PropertyType = {
    #oneBhk;
    #twoBhk;
    #threeBhk;
    #squareFeet;
    #villa;
    #commercial;
  };

  type Booking = {
    id : Text;
    name : Text;
    phone : Text;
    address : Text;
    service : ServiceType;
    propertyType : PropertyType;
    date : Text;
    time : Text;
    notes : Text;
    timestamp : Time.Time;
  };

  type Review = {
    id : Text;
    name : Text;
    service : ServiceType;
    rating : Nat;
    reviewText : Text;
    date : Time.Time;
  };

  let bookings = Map.empty<Text, Booking>();
  let reviews = Map.empty<Text, Review>();

  public shared ({ caller }) func addBooking(
    name : Text,
    phone : Text,
    address : Text,
    service : ServiceType,
    propertyType : PropertyType,
    date : Text,
    time : Text,
    notes : Text,
  ) : async () {
    let id = Time.now().toText();
    let booking : Booking = {
      id;
      name;
      phone;
      address;
      service;
      propertyType;
      date;
      time;
      notes;
      timestamp = Time.now();
    };

    bookings.add(id, booking);
  };

  /// Add a review to the system.
  public shared ({ caller }) func addReview(
    name : Text,
    service : ServiceType,
    rating : Nat,
    reviewText : Text,
  ) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let id = Time.now().toText();
    let review : Review = {
      id;
      name;
      service;
      rating;
      reviewText;
      date = Time.now();
    };

    reviews.add(id, review);
  };

  /// Get approved reviews by service.
  public query ({ caller }) func getReviewsByService(service : ServiceType) : async [Review] {
    reviews.filter(
      func(_, review) { review.service == service }
    ).values().toArray();
  };

  /// Get all bookings.
  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  /// Get reviews by rating.
  public query ({ caller }) func getReviewsByRating(rating : Nat) : async [Review] {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    reviews.filter(
      func(_, review) { review.rating == rating }
    ).values().toArray();
  };

  /// Get featured reviews (up to 5).
  public query ({ caller }) func getFeaturedReviews() : async [Review] {
    let allReviews = reviews.values().toArray();
    if (allReviews.size() <= 5) {
      allReviews;
    } else {
      Array.tabulate(
        5,
        func(i) {
          allReviews[i];
        },
      );
    };
  };

  /// Get all reviews.
  public query ({ caller }) func getAllReviews() : async [Review] {
    reviews.values().toArray();
  };

  /// Delete a review.
  public shared ({ caller }) func deleteReview(reviewId : Text) : async () {
    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review does not exist") };
      case (?_) {
        reviews.remove(reviewId);
      };
    };
  };

  /// Update a review.
  public shared ({ caller }) func updateReview(
    reviewId : Text,
    name : Text,
    service : ServiceType,
    rating : Nat,
    reviewText : Text,
  ) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review does not exist") };
      case (?existingReview) {
        let updatedReview = {
          id = existingReview.id;
          name;
          service;
          rating;
          reviewText;
          date = existingReview.date;
        };
        reviews.add(reviewId, updatedReview);
      };
    };
  };

  /// Get WhatsApp link for booking.
  public query ({ caller }) func getWhatsAppBookingLink(service : ServiceType) : async Text {
    let phoneNumber = "8884447229";
    switch (service) {
      case (#pestControl or #deepCleaning or #carpetUpholstery or #painting) {
        "https://wa.me/" # phoneNumber # "?text=I'm%20interested%20in%20booking%20a%20service.";
      };
      case (#other) {
        "https://wa.me/" # phoneNumber # "?text=I'm%20interested%20in%20getting%20a%20quote%20for%20your%20services.";
      };
    };
  };
};

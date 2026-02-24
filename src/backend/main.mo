import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  include MixinStorage();

  type ServiceType = {
    #residentialDeepCleaning;
    #commercialCleaning;
    #carpetUpholstery;
    #pestControl;
    #other;
  };

  type Booking = {
    id : Text;
    name : Text;
    phone : Text;
    email : Text;
    service : ServiceType;
    address : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Review = {
    id : Text;
    name : Text;
    service : ServiceType;
    rating : Nat;
    reviewText : Text;
    photo : ?Storage.ExternalBlob;
    date : Time.Time;
    approvalStatus : Bool;
  };

  let bookings = Map.empty<Text, Booking>();
  let reviews = Map.empty<Text, Review>();

  /// Add a booking to the system.
  public shared ({ caller }) func addBooking(
    name : Text,
    phone : Text,
    email : Text,
    service : ServiceType,
    address : Text,
    message : Text,
  ) : async () {
    let id = Time.now().toText();
    let booking : Booking = {
      id;
      name;
      phone;
      email;
      service;
      address;
      message;
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
    photo : ?Storage.ExternalBlob,
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
      photo;
      date = Time.now();
      approvalStatus = false;
    };

    reviews.add(id, review);
  };

  /// Approve a review for use in system.
  public shared ({ caller }) func approveReview(reviewId : Text) : async () {
    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review does not exist") };
      case (?review) {
        let updatedReview = { review with approvalStatus = true };
        reviews.add(reviewId, updatedReview);
      };
    };
  };

  // Expose reviews for a service.
  public query ({ caller }) func getApprovedReviewsByService(service : ServiceType) : async [Review] {
    reviews.filter(
      func(_, review) { review.approvalStatus and review.service == service }
    ).values().toArray();
  };

  /// Expose all bookings in the system.
  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  /// Expose all reviews for a specific rating.
  public query ({ caller }) func getReviewsByRating(rating : Nat) : async [Review] {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    reviews.filter(
      func(_, review) { review.rating == rating }
    ).values().toArray();
  };

  /// Get a MODIFIED list of up to 5 featured reviews, for use in carousels.
  public query ({ caller }) func getFeaturedReviews() : async [Review] {
    let approvedReviews = reviews.filter(
      func(_, review) { review.approvalStatus }
    ).values();
    let featuredReviews = approvedReviews.toArray();
    if (featuredReviews.size() <= 5) {
      featuredReviews;
    } else {
      Array.tabulate(
        5,
        func(i) {
          featuredReviews[i];
        },
      );
    };
  };

  /// Query all approved reviews regardless of service.
  public query ({ caller }) func getAllApprovedReviews() : async [Review] {
    reviews.filter(
      func(_, review) { review.approvalStatus }
    ).values().toArray();
  };

  /// Directly delete a specific review.
  public shared ({ caller }) func deleteReview(reviewId : Text) : async () {
    switch (reviews.get(reviewId)) {
      case (null) { Runtime.trap("Review does not exist") };
      case (?_) {
        reviews.remove(reviewId);
      };
    };
  };

  /// Update a specific review with new information.
  public shared ({ caller }) func updateReview(
    reviewId : Text,
    name : Text,
    service : ServiceType,
    rating : Nat,
    reviewText : Text,
    photo : ?Storage.ExternalBlob,
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
          photo;
          date = existingReview.date;
          approvalStatus = existingReview.approvalStatus;
        };
        reviews.add(reviewId, updatedReview);
      };
    };
  };
};

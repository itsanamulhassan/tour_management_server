// Steps for confirming payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Completed) -> Backend -> Update Payment (Paid) & Booking (Confirm) -> Redirect to frontend success page

// Steps for failure payment.
// Frontend -> User -> Tour -> Booking (Pending) -> Payment (Unpaid) -> SSLCommerz page -> (if Payment Failed / Cancel) -> Backend -> Update Payment (Fail) & Booking (Fail) -> Redirect to frontend failure page

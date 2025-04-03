package com.shoppit.ecommerce.entity.order;

import lombok.Data;

@Data
public class PaymentDetails {
    private String paymentId;
    private PaymentStatus paymentStatus;
    private String razorpayPaymentLinkId;
    private String razorpayPaymentLinkReferenceId;
    private String razorpayPaymentLinkStatus;
    private String razorpayPaymentIdZWSP;

}

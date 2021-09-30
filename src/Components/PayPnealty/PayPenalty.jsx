import React, { useState, useEffect } from "react";
import "./PayPenalty.css";
import {
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import axios from "axios";

export default function CheckoutForm(props) {
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        window
            .fetch("/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({items: [
                    {
                        id: "xl-tshirt",
                        penalty:props.record.penalty
                    }
                    ]})
            })
            .then(res => {
                return res.json();
            })
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, []);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev => {
        ev.preventDefault();
        setProcessing(true);
        //console.log(succeeded);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
            const recordId = props.record.recordId
            console.log(recordId);
            var para = {
                recordId
            }
            axios({
                url: '/api/BookList/CompletePayFine',
                method: 'post',
                headers: {
                    'deviceCode': 'A95ZEF1-47B5-AC90BF3'
                },
                contentType:'application/json'
                ,
                data: {
                    recordId:para.recordId
                }}).then(response =>{
                    alert(response.data.message);
                    window.location.href="/BorrowRecord";
            })

        }
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
            <button
                disabled={processing || disabled || succeeded}
                id="submit"
            >
        <span id="button-text">
          {processing ? (
              <div className="spinner" id="spinner"></div>
          ) : (
              "Pay now"
          )}
        </span>
            </button>
            {/* Show any error that happens when processing the payment */}
            {error && (
                <div className="card-error" role="alert">
                    {error}
                </div>
            )}
            {/* Show a success message upon completion */}
            <p className={succeeded ? "result-message" : "hidden"}>
                Payment succeeded, see the result in your
                <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
                    Stripe dashboard.
                </a> Refresh the page to pay again.
            </p>
        </form>
    );
}


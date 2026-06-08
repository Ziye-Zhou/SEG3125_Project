const { useState } = React;

function FAQApp() {
    const faqs = [
        {
            question: "I am new to powerlifting. Can I still use this service?",
            answer: "Yes. Private coaching is beginner-friendly and can help you learn proper squat, bench press, and deadlift technique."
        },
        {
            question: "How many sessions do I need?",
            answer: "It depends on your experience, goals, and current technique. Many beginners start with an initial consultation and then choose a few private coaching sessions."
        },
        {
            question: "How is the training plan personalized?",
            answer: "The training plan is personalized based on your experience level, current strength, training goals, weekly schedule, available equipment, and competition timeline if you are preparing for a meet."
        },
        {
            question: "Is the nutrition plan for weight loss?",
            answer: "No. The nutrition plan focuses on supporting training energy, recovery, and consistent eating habits for lifters."
        },
        {
            question: "Are these services only for powerlifting?",
            answer: "Yes. This coaching service mainly focuses on powerlifting, including squat, bench press, deadlift technique, and strength programming. It is less targeted toward general fat loss or bodybuilding goals."
        }
    ];

    const [openIndex, setOpenIndex] = useState(null);

    function toggleFAQ(index) {
        if (openIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    }

    return React.createElement(
        "div",
        { className: "react-faq-list" },
        faqs.map(function (item, index) {
            const isOpen = openIndex === index;

            return React.createElement(
                "div",
                { className: "react-faq-item", key: index },

                React.createElement(
                    "button",
                    {
                        className: "react-faq-question",
                        type: "button",
                        onClick: function () {
                            toggleFAQ(index);
                        }
                    },
                    item.question,
                    React.createElement(
                        "span",
                        { className: "react-faq-arrow" },
                        isOpen ? "▲" : "▼"
                    )
                ),

                isOpen &&
                React.createElement(
                    "div",
                    { className: "react-faq-answer" },
                    item.answer
                )
            );
        })
    );
}

const faqRoot = document.getElementById("faqReactRoot");

if (faqRoot) {
    ReactDOM.createRoot(faqRoot).render(React.createElement(FAQApp));
}
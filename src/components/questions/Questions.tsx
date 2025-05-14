import { Button } from "../ui/button";

const questionsData = [
  {
    question: "What size should I order for clothing?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    question: "How can I track my order status?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    question: "How can I cancel my order?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
  },
];

const Questions = () => {
  return (
    <section className="bg-background mt-4 px-4 py-10 md:px-8">
      <h3 className="font-bold text-2xl mb-2">Frenquently Asked Questions</h3>
      <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
        <p className="text-muted-foreground">
          Find answers to common inquiries about products, shipping, returns,
          and customer support.
        </p>
        <Button variant={"outline"} className="text-start">
          Contact Us
        </Button>
      </div>

      <div></div>
    </section>
  );
};

export default Questions;

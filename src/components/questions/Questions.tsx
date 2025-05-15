import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";

const Questions = () => {
  return (
    <section className="bg-background mt-4 px-4 py-10 w-full">
      <div className="w-full md:w-[90%] mx-auto">
        <h3 className="font-bold text-2xl mb-2">Frenquently Asked Questions</h3>
        <div className="flex flex-col gap-2 md:flex-row md:items-center justify-between">
          <p className="text-muted-foreground md:w-[400px]">
            Find answers to common inquiries about products, shipping, returns,
            and customer support.
          </p>
          <Button variant={"outline"} className="text-start">
            Contact Us
          </Button>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full mt-8 flex flex-col md:flex-row md:justify-between md:gap-20"
        >
          <div className="flex-1/2 flex flex-col gap-4">
            <AccordionItem
              value="question-1"
              className="bg-accent px-4 border-b-0 rounded-sm"
            >
              <AccordionTrigger className="cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-base">01</span>
                  <p>What size should I order for clothing?</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="question-2"
              className="bg-accent px-4 border-b-0 mb-4 md:mb-0 rounded-sm"
            >
              <AccordionTrigger className="cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-base">02</span>
                  <p>How can I track my order status?</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="flex-1/2 flex flex-col gap-4">
            <AccordionItem
              value="question-3"
              className="bg-accent px-4 border-b-0 rounded-sm"
            >
              <AccordionTrigger className="cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-base">03</span>
                  <p>How can I cancel my order?</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="question-4"
              className="bg-accent px-4 border-b-0 rounded-sm"
            >
              <AccordionTrigger className="cursor-pointer">
                <div className="flex items-center gap-4">
                  <span className="text-muted-foreground text-base">04</span>
                  <p>What payment methods do you accept?</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam, quod.
                </p>
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
      </div>
    </section>
  );
};

export default Questions;

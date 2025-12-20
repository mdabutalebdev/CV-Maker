import Button from "@/components/shared/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="md:mt-26 md:mt-10 py-10">
     <div className="container mx-auto px-5 md:px-20 gap-10  md:flex  items-center justify-center">
       <div className="">
        <Image
          src="/images/Frame 2147225043.png"
          alt="Frame 2147225043"
          width={500}
          height={250}
          className="md:h-[380px] h-full w-full"
        />
      </div>
      <div className="">
        <h3 className="font-bold md:text-6xl text-3xl pt-2 text-heading w-full md:w-[600px]">Create Your <span className="text-primary">AI-Powered Resume</span> </h3>
        <h4 className="w-full   md:w-[700px] text-heading font-medium text-[20px] md:leading-10 pt-5">Let our AI technology help you build a professional resume tailored to your skills, experience, and career goals.</h4>
        <p className="md:w-[510px] w-full text-[14px] text-secondary pt-2">Follow these simple steps to create a standout resume that will get you noticed by top employers.</p>
       <Link href="/steps/1" className="cursor-pointer">
        <Button className="mt-10">
          Start Now
        </Button>
       </Link>
      </div>
     </div>
    </div>
  );
}

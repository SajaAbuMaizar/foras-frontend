'use client';

type PageHeadingProps = {
  title: string;
  image: string;
};

const PageHeading = ({ title, image }: PageHeadingProps) => (
  <section
    className="relative bg-cover bg-center h-[350px] flex items-center justify-center"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-70" />
    <div className="relative z-10 text-center text-white">
      <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>
    </div>
  </section>
);

export default PageHeading;

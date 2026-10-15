import Image from "next/image";
import { ButtonLink } from "./button-link";
import { Reveal } from "./motion/reveal";

export function CtaBand({
  title = "Una taza compartida alcanza para más.",
  text = "Tu tiempo, tu experiencia o tu aporte hacen posible que más personas y comunidades encuentren acompañamiento.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page py-16 md:py-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-forest px-6 py-14 text-white md:px-16 md:py-20">
        <Image
          src="/brand/isotipo-negativo.png"
          alt=""
          width={669}
          height={470}
          className="pointer-events-none absolute -right-16 -bottom-10 w-72 opacity-15 md:w-[28rem]"
        />
        <div className="relative max-w-2xl">
          <h2 className="text-4xl md:text-6xl">{title}</h2>
          <p className="mt-5 text-lg text-forest-soft">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/involucrate#donar" variant="light">
              Quiero donar
            </ButtonLink>
            <ButtonLink href="/involucrate#voluntariado" variant="outlineLight">
              Ser voluntario
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

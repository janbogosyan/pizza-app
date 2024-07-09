// import Header from "@/components/layout/Header";
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeadesrs";

export default function Home() {
  return (
    <>
      {/* <Header /> сме го преместили в layout.js за да може да е видим на всички страници */}
      <Hero />
      <HomeMenu />
      <section className="text-center my-16">
        <SectionHeaders subHeader={'Our story'} mainHeader={'About us'} />
        <div className="max-w-md mx-auto text-grey-500 mt-4
        flex-col gap-4">
          <p>
            asdasd asdasdasd ,adsasd,iuoyuiyouyiuoyu ok what u are doing.
            ok lose to ht masd.lasdoll sdsdq aperiam esse fugia t inventors lab
          </p>
          <p>
            asdasd asdasdasd ,adsasd,iuoyuiyouyiuoyu ok what u are doing.
            ok lose to ht masd.lasdoll sdsdq aperiam esse fugia t inventors lab
          </p>
          <p>
            asdasd asdasdasd ,adsasd,iuoyuiyouyiuoyu ok what u are doing.
            ok lose to ht masd.lasdoll sdsdq aperiam esse fugia t inventors lab
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'} />
        <div className="mt-8">
          <a className="text-4xl underline text-purple-200" href="tel:+3545123123">
            +35 451 23 123
          </a>
        </div>
      </section>
      {/* footera също сме го преместили в layout.js */}
      {/* <footer className="border-t p-16 text-center text-red-500">
        &copy; 2024 All right reserved
      </footer> */}
    </>
  )
}

import { Navbar } from "@/components/navbar"
import { SkinStage } from "@/components/skins/skin-stage"

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <SkinStage />
      </main>
    </>
  )
}

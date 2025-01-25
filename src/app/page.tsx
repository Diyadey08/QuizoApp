import Header from "@/components/Header"
import FeatureCard from "@/components/FeatureCard"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Welcome to Quizo Fun!</h2>
          <p className="text-xl text-gray-700">
            Embark on an exciting journey to master Python through fun quizzes and interactive challenges.
          </p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon="🧠"
            title="Learn by Doing"
            description="Engage with interactive quizzes that make learning Python a breeze."
          />
          <FeatureCard
            icon="🏆"
            title="Track Progress"
            description="See your improvement over time with our built-in progress tracker."
          />
          <FeatureCard
            icon="🌈"
            title="Fun Challenges"
            description="Take on colorful, themed challenges to test your Python skills."
          />
        </section>
        <section className="text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">Ready to Start Your Python Adventure?</h2>
          <Link href={"/quiz"} className="bg-yellow-400 text-purple-800 font-bold py-3 px-8 rounded-full text-xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105">
            Begin Now!
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}


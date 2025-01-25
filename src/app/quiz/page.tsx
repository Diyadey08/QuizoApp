"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { quizQuestions } from "./question"
import confetti from "canvas-confetti"
import Link from "next/link"

export default function CodingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)

  const handleAnswer = (selectedIndex: number) => {
    setSelectedAnswer(selectedIndex)
    const isCorrect = selectedIndex === quizQuestions[currentQuestion].correctAnswer
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    setSelectedAnswer(null)
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
      if (score > 10) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        })
      }
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResult(false)
    setSelectedAnswer(null)
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  if (showResult) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white p-4">
        <h2 className="text-4xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-2xl mb-4">
          Your score: {score} out of {quizQuestions.length}
        </p>
        <Button
          onClick={restartQuiz}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded"
        >
          Play Again
        </Button>
        <Link href={"/lvl2"} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mt-2">Next Level</Link>
      </div>
    )
  }

  const question = quizQuestions[currentQuestion]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-8">🚀 Coding Quiz for Kids 🚀</h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 mb-8">
        <Progress value={progress} className="mb-4" />
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Question {currentQuestion + 1}</h2>
        <p className="text-xl mb-6 text-gray-700">{question.question}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`text-lg py-3 ${
                selectedAnswer === index
                  ? selectedAnswer === question.correctAnswer
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={selectedAnswer !== null}
            >
              {option}
            </Button>
          ))}
        </div>
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-xl font-bold py-3 rounded"
        >
          {currentQuestion === quizQuestions.length - 1 ? "Finish Quiz" : "Next Question"}
        </Button>
        
      </div>
    </div>
  )
}


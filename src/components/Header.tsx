"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
export default function Header() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4 text-white">
      <div className="container mx-auto text-center">
        <motion.h1
          className="text-3xl md:text-5xl font-bold mb-2"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Quizo Fun
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Learn Python with Excitement!
        </motion.p>
        <Link href={"/quiz"}
          className="bg-yellow-400 text-purple-800 font-bold py-2 px-6 rounded-full text-lg shadow-lg transform transition duration-300 ease-in-out"
        >
          Start
        </Link>
      </div>
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-4 left-4 text-5xl"
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          🐍
        </motion.div>
        <motion.div
          className="absolute bottom-4 right-4 text-5xl"
          animate={{ rotate: isHovered ? -360 : 0 }}
          transition={{ duration: 0.5 }}
        >
          🎈
        </motion.div>
      </motion.div>
    </header>
  )
}


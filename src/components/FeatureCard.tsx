"use client"
import { motion } from "framer-motion"

interface FeatureCardProps {
  icon: string
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-purple-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}


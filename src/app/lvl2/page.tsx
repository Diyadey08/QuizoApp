"use client"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface Block {
  id: string
  content: string
  type: "print" | "variable" | "operator" | "newline"
}

export default function CodeBuilder() {
  const [blocks] = useState<Block[]>([
    { id: "print1", content: "print", type: "print" },
    { id: "var1", content: "a", type: "variable" },
    { id: "var2", content: "b", type: "variable" },
    { id: "op1", content: "+", type: "operator" },
    { id: "op2", content: "-", type: "operator" },
    { id: "op3", content: "*", type: "operator" },
    { id: "op4", content: "/", type: "operator" },
    { id: "nl1", content: "\\n", type: "newline" },
  ])

  const [arrangedBlocks, setArrangedBlocks] = useState<Block[]>([])
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [draggedBlock, setDraggedBlock] = useState<number | null>(null)

  // Generate a unique ID for new blocks
  const generateUniqueId = (baseId: string) => {
    return `${baseId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const handleDragStart = (e: React.DragEvent, block: Block, fromArranged?: boolean, index?: number) => {
    e.dataTransfer.setData("blockId", block.id)
    e.dataTransfer.setData("fromArranged", fromArranged ? "true" : "false")
    if (typeof index === "number") {
      setDraggedBlock(index)
    }
  }

  const handleDrop = (e: React.DragEvent, dropIndex?: number) => {
    e.preventDefault()
    const blockId = e.dataTransfer.getData("blockId")
    const fromArranged = e.dataTransfer.getData("fromArranged") === "true"

    if (fromArranged && typeof draggedBlock === "number" && typeof dropIndex === "number") {
      // Reordering within arranged blocks
      const newBlocks = [...arrangedBlocks]
      const [movedBlock] = newBlocks.splice(draggedBlock, 1)
      newBlocks.splice(dropIndex, 0, movedBlock)
      setArrangedBlocks(newBlocks)
    } else {
      // Adding new block from source
      const block = blocks.find((b) => b.id === blockId)
      if (block) {
        const newBlock = { ...block, id: generateUniqueId(block.id) }
        if (typeof dropIndex === "number") {
          setArrangedBlocks((prev) => {
            const newBlocks = [...prev]
            newBlocks.splice(dropIndex, 0, newBlock)
            return newBlocks
          })
        } else {
          setArrangedBlocks((prev) => [...prev, newBlock])
        }
      }
    }
    setDraggedBlock(null)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleEdit = (id: string, newContent: string) => {
    setArrangedBlocks(arrangedBlocks.map((block) => (block.id === id ? { ...block, content: newContent } : block)))
  }

  const handleDelete = (index: number) => {
    setArrangedBlocks((prev) => prev.filter((_, i) => i !== index))
  }

  const generateCode = () => {
    console.log("Converting HTML to Markdown...") //Update 1
    return arrangedBlocks
      .map((block) => {
        switch (block.type) {
          case "print":
            return `print(${block.content})`
          case "newline":
            return "\n"
          case "variable":
          case "operator":
            return block.content
          default:
            return ""
        }
      })
      .join(" ")
      .replace(/ \n /g, "\n")
  }

  const getBlockColor = (type: string) => {
    switch (type) {
      case "print":
        return "bg-pink-400 hover:bg-pink-500"
      case "variable":
        return "bg-purple-400 hover:bg-purple-500"
      case "operator":
        return "bg-blue-400 hover:bg-blue-500"
      case "newline":
        return "bg-green-400 hover:bg-green-500"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://hebbkx1anhila5yf.public.blob.vercel-storage.com/operatorback.jpg-UXkRU8UKgXmB8lLGwyIxzwVJCi8lyS.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="grid grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Source Blocks */}
        <Card className="p-4 bg-transparent backdrop-blur-sm rounded-2xl border-4 border-purple-300 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Magic Blocks ✨</h2>
          <div className="space-y-4">
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                draggable
                onDragStart={(e) => handleDragStart(e, block)}
                className={`p-4 ${getBlockColor(block.type)} text-white rounded-xl cursor-move text-center font-bold shadow-lg transform transition-all duration-200 border-2 border-white`}
              >
                {block.content}
                <Sparkles className="w-4 h-4 inline ml-2" />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Arrangement Area */}
        <Card
          className="p-4 bg-transparent backdrop-blur-sm rounded-2xl border-4 border-blue-300 shadow-xl min-h-[500px]"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e)}
        >
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Build Your Spell 🪄</h2>
          <div className="space-y-3">
            {arrangedBlocks.map((block, index) => (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                draggable
                onDragStart={(e) => handleDragStart(e, block, true, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`p-3 ${getBlockColor(block.type)} rounded-xl flex items-center gap-2 group shadow-md`}
              >
                {editingBlock === block.id ? (
                  <Input
                    value={block.content}
                    onChange={(e) => handleEdit(block.id, e.target.value)}
                    onBlur={() => setEditingBlock(null)}
                    autoFocus
                    className="flex-1 bg-white/50 border-2 border-white"
                  />
                ) : (
                  <div onClick={() => setEditingBlock(block.id)} className="flex-1 cursor-text text-white font-bold">
                    {block.content}
                  </div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(index)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-400 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Generated Code */}
        <Card className="p-4 bg-transparent backdrop-blur-sm rounded-2xl border-4 border-green-300 shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Magic Result 🎯</h2>
          <pre className="bg-black/80 p-6 rounded-xl text-green-400 font-mono shadow-inner whitespace-pre-wrap">
            {generateCode()}
          </pre>
        </Card>
      </div>
    </div>
  )
}


"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette, X, RotateCcw, Plus } from "lucide-react"

// Available color presets
const colorPresets = {
  preset1: {
    darkGreen: { name: "Dark Green", value: "#0A400C" },
    mediumGreen: { name: "Medium Green", value: "#819067" },
    lightGreen: { name: "Light Green", value: "#B1AB86" },
    cream: { name: "Cream", value: "#FEFAE0" },
  },
  preset2: {
    darkGreen: { name: "Dark Green", value: "#328E6E" },
    mediumGreen: { name: "Medium Green", value: "#67AE6E" },
    lightGreen: { name: "Light Green", value: "#90C67C" },
    cream: { name: "Cream", value: "#E1EEBC" },
  }
}

// Default color assignments
const defaultAssignments = {
  primary: "darkGreen",
  secondary: "mediumGreen", 
  accent: "lightGreen",
  muted: "cream",
  background: "cream",
  foreground: "darkGreen",
}

export default function ColorPaletteDev() {
  const [isOpen, setIsOpen] = useState(false)
  const [assignments, setAssignments] = useState(defaultAssignments)
  const [currentPreset, setCurrentPreset] = useState<"preset1" | "preset2">("preset1")
  const [customColors, setCustomColors] = useState<Record<string, { name: string; value: string }>>({})
  const [newColorName, setNewColorName] = useState("")
  const [newColorValue, setNewColorValue] = useState("#000000")
  
  // Combine preset colors with custom colors
  const availableColors = useMemo(() => ({
    ...colorPresets[currentPreset],
    ...customColors
  }), [currentPreset, customColors])

  // Apply colors on mount and when assignments or preset change
  useEffect(() => {
    const applyColors = (newAssignments: typeof assignments) => {
      const root = document.documentElement
      root.style.setProperty('--primary', availableColors[newAssignments.primary as keyof typeof availableColors].value)
      root.style.setProperty('--secondary', availableColors[newAssignments.secondary as keyof typeof availableColors].value)
      root.style.setProperty('--accent', availableColors[newAssignments.accent as keyof typeof availableColors].value)
      root.style.setProperty('--muted', availableColors[newAssignments.muted as keyof typeof availableColors].value)
      root.style.setProperty('--background', availableColors[newAssignments.background as keyof typeof availableColors].value)
      root.style.setProperty('--foreground', availableColors[newAssignments.foreground as keyof typeof availableColors].value)
      
      // Also set foreground colors for contrast
      root.style.setProperty('--primary-foreground', availableColors[newAssignments.background as keyof typeof availableColors].value)
      root.style.setProperty('--secondary-foreground', availableColors[newAssignments.background as keyof typeof availableColors].value)
      root.style.setProperty('--accent-foreground', availableColors[newAssignments.foreground as keyof typeof availableColors].value)
      root.style.setProperty('--muted-foreground', availableColors[newAssignments.foreground as keyof typeof availableColors].value)
    }
    
    applyColors(assignments)
  }, [assignments, availableColors])

  const handleColorChange = (role: string, colorKey: string) => {
    const newAssignments = { ...assignments, [role]: colorKey }
    setAssignments(newAssignments)
  }

  const addCustomColor = () => {
    if (newColorName.trim() && newColorValue) {
      const colorKey = newColorName.toLowerCase().replace(/\s+/g, '')
      setCustomColors(prev => ({
        ...prev,
        [colorKey]: { name: newColorName.trim(), value: newColorValue }
      }))
      setNewColorName("")
      setNewColorValue("#000000")
    }
  }

  const removeCustomColor = (colorKey: string) => {
    setCustomColors(prev => {
      const newCustomColors = { ...prev }
      delete newCustomColors[colorKey]
      return newCustomColors
    })
    // If this color was assigned to any role, reset those roles to default
    const updatedAssignments = { ...assignments }
    let hasChanges = false
    Object.entries(assignments).forEach(([role, assignedColorKey]) => {
      if (assignedColorKey === colorKey) {
        updatedAssignments[role as keyof typeof assignments] = defaultAssignments[role as keyof typeof defaultAssignments]
        hasChanges = true
      }
    })
    if (hasChanges) {
      setAssignments(updatedAssignments)
    }
  }

  const resetToDefaults = () => {
    setAssignments(defaultAssignments)
  }

  const generateTailwindConfig = () => {
    const config = Object.entries(assignments).reduce((acc, [role, colorKey]) => {
      acc[role] = availableColors[colorKey as keyof typeof availableColors].value
      return acc
    }, {} as Record<string, string>)
    
    const configString = JSON.stringify(config, null, 2)
    navigator.clipboard.writeText(configString)
    alert("Tailwind color config copied to clipboard!")
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="sm"
      >
        <Palette className="h-4 w-4 mr-2" />
        Color Dev
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80 max-h-96 overflow-y-auto shadow-xl border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Color Palette Dev
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preset Selector */}
        <div className="space-y-2">
          <label className="text-xs font-medium">Color Preset:</label>
          <div className="flex gap-1">
            <Button
              variant={currentPreset === "preset1" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPreset("preset1")}
              className="flex-1 text-xs"
            >
              Preset 1
            </Button>
            <Button
              variant={currentPreset === "preset2" ? "default" : "outline"}
              size="sm"
              onClick={() => setCurrentPreset("preset2")}
              className="flex-1 text-xs"
            >
              Preset 2
            </Button>
          </div>
        </div>

        {/* Custom Color Input */}
        <div className="space-y-2 border-t pt-3">
          <label className="text-xs font-medium">Add Custom Color:</label>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Color name"
              value={newColorName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColorName(e.target.value)}
              className="w-full text-xs h-7 px-2 border border-gray-300 rounded"
            />
            <div className="flex gap-1">
              <input
                type="color"
                value={newColorValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColorValue(e.target.value)}
                className="w-8 h-7 rounded border cursor-pointer"
              />
              <input
                type="text"
                placeholder="#000000"
                value={newColorValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewColorValue(e.target.value)}
                className="text-xs h-7 flex-1 font-mono px-2 border border-gray-300 rounded"
              />
              <Button
                size="sm"
                onClick={addCustomColor}
                disabled={!newColorName.trim()}
                className="h-7 px-2"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Color Assignments */}
        {Object.entries(assignments).map(([role, currentColorKey]) => (
          <div key={role} className="space-y-2">
            <label className="text-xs font-medium capitalize">{role}:</label>
            <div className="grid grid-cols-2 gap-1">
              {Object.entries(availableColors).map(([colorKey, color]) => {
                const isCustomColor = colorKey in customColors
                return (
                  <div key={colorKey} className="relative">
                    <button
                      onClick={() => handleColorChange(role, colorKey)}
                      className={`w-full p-1 text-xs rounded border-2 flex items-center gap-1 ${
                        currentColorKey === colorKey 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      title={color.name}
                    >
                      <div 
                        className="w-3 h-3 rounded border"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="truncate">{color.name}</span>
                    </button>
                    {isCustomColor && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeCustomColor(colorKey)
                        }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600"
                        title="Remove custom color"
                      >
                        ×
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="flex-1"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={generateTailwindConfig}
            className="flex-1"
          >
            Copy Config
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

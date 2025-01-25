import { ExampleSelector } from "@/components/example-selector"
import { Waitlist } from "@/components/waitlist"
import type Example from "./interfaces"

async function getExamples(): Promise<Record<string, Example>> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/examples`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch examples')
  }

  return response.json()
}

export default async function ExamplesPage() {
  const examples = await getExamples()

  return (
    <div className="flex justify-center min-h-screen bg-slate-50">
      <div className="container max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">Company Analysis Examples</h1>
        <ExampleSelector examples={examples} />
        <Waitlist />
      </div>
    </div>
  )
} 
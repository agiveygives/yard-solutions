const jobTypes = {
  'lawn-care': 'Lawn Care',
  'landscaping': 'Landscaping',
  'snow-removal': 'Snow Removal',
  'leaf-removal': 'Leaf Removal'
}

export function formatJobType(type: string): string {
  return jobTypes[type as keyof typeof jobTypes] || type
}

export default formatJobType

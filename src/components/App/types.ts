export type User = {
  id: number
  name: string
  email: string
  age: number
  role: string
  status: "active" | "inactive"
}

export type FormData = {
  name: string
  email: string
  password: string
  search: string
}

export type SizesDemoData = {
  sm: string
  md: string
  lg: string
}

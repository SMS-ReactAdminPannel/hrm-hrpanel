export type Notification = {
  id: string
  name?: string
  message: string
  timestamp: string
  icon: "star" | "file" | string
  isStarred: boolean
  type: string
}

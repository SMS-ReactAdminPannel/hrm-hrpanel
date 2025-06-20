export const getRandomColor = () => {
  const colors = [
    "bg-red-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-orange-200",
    "bg-amber-200",
    "bg-lime-200",
    "bg-emerald-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-violet-200",
    "bg-fuchsia-200",
    "bg-rose-200",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getInitials = (title: string) => {
  return title
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()
}

export const normalizeOptions = (options: (string | { value: string; label: string })[]) => {
  return options.map((option) => (typeof option === "string" ? { value: option, label: option } : option))
}



import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Plus, Monitor, Laptop, Package, Edit3, Trash2, Filter } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

interface Asset {
  id: string
  name: string
  assignedTo: string
  category: string
  serialNumber: string
  status: "active" | "maintenance" | "returned"
  dateAdded: string
}

interface Employee {
  id: string
  name: string
  email: string
  department: string
  position: string
  phone: string
  startDate: string
  manager: string
}

const employees: Employee[] = [
  {
    id: "1",
    name: "Wikki",
    email: "wikki@company.com",
    department: "Engineering",
    position: "Senior Developer",
    phone: "+1 (555) 123-4567",
    startDate: "2023-01-15",
    manager: "John Smith",
  },
  {
    id: "2",
    name: "Sowmiya",
    email: "sowmiya@company.com",
    department: "Design",
    position: "UI/UX Designer",
    phone: "+1 (555) 234-5678",
    startDate: "2023-02-01",
    manager: "Jane Doe",
  },
  {
    id: "3",
    name: "Suruthiga",
    email: "suruthiga@company.com",
    department: "Marketing",
    position: "Marketing Specialist",
    phone: "+1 (555) 345-6789",
    startDate: "2023-03-10",
    manager: "Mike Johnson",
  },
  {
    id: "4",
    name: "Sumathi",
    email: "sumathi@company.com",
    department: "HR",
    position: "HR Manager",
    phone: "+1 (555) 456-7890",
    startDate: "2022-11-20",
    manager: "Sarah Wilson",
  },
  {
    id: "5",
    name: "Ammu",
    email: "ammu@company.com",
    department: "Finance",
    position: "Financial Analyst",
    phone: "+1 (555) 567-8901",
    startDate: "2023-04-05",
    manager: "David Brown",
  },
  {
    id: "6",
    name: "Sivasankar",
    email: "sivasankar@company.com",
    department: "Engineering",
    position: "DevOps Engineer",
    phone: "+1 (555) 678-9012",
    startDate: "2023-01-30",
    manager: "John Smith",
  },
  {
    id: "7",
    name: "Raajes",
    email: "raajes@company.com",
    department: "Sales",
    position: "Sales Representative",
    phone: "+1 (555) 789-0123",
    startDate: "2023-05-15",
    manager: "Lisa Garcia",
  },
  {
    id: "8",
    name: "Surya",
    email: "surya@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    phone: "+1 (555) 890-1234",
    startDate: "2023-06-01",
    manager: "John Smith",
  },
  {
    id: "9",
    name: "John",
    email: "john@company.com",
    department: "Product",
    position: "Product Manager",
    phone: "+1 (555) 901-2345",
    startDate: "2022-08-10",
    manager: "Emily Davis",
  },
  {
    id: "10",
    name: "Jane",
    email: "jane@company.com",
    department: "Design",
    position: "Graphic Designer",
    phone: "+1 (555) 012-3456",
    startDate: "2023-07-20",
    manager: "Jane Doe",
  },
  {
    id: "11",
    name: "Bob",
    email: "bob@company.com",
    department: "IT",
    position: "System Administrator",
    phone: "+1 (555) 123-4567",
    startDate: "2022-12-05",
    manager: "Tom Anderson",
  },
  {
    id: "12",
    name: "Alice",
    email: "alice@company.com",
    department: "Engineering",
    position: "Backend Developer",
    phone: "+1 (555) 234-5678",
    startDate: "2023-08-15",
    manager: "John Smith",
  },
  {
    id: "13",
    name: "Charlie",
    email: "charlie@company.com",
    department: "Operations",
    position: "Operations Manager",
    phone: "+1 (555) 345-6789",
    startDate: "2022-09-30",
    manager: "Robert Lee",
  },
  {
    id: "14",
    name: "David",
    email: "david@company.com",
    department: "QA",
    position: "QA Engineer",
    phone: "+1 (555) 456-7890",
    startDate: "2023-09-01",
    manager: "Maria Rodriguez",
  },
  {
    id: "15",
    name: "Eva",
    email: "eva@company.com",
    department: "Engineering",
    position: "Full Stack Developer",
    phone: "+1 (555) 567-8901",
    startDate: "2023-10-10",
    manager: "John Smith",
  },
]

const AssetsManagement: React.FC = () => {
  const [search, setSearch] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
  const [showCategoryDropdown, setShowCategoryDropdown] = useState<boolean>(false)
  const [showModalCategoryDropdown, setShowModalCategoryDropdown] = useState<boolean>(false)
  const [showModalStatusDropdown, setShowModalStatusDropdown] = useState<boolean>(false)

  const modalRef = useRef<HTMLDivElement>(null)
  const categoryDropdownRef = useRef<HTMLDivElement>(null)
  const modalCategoryDropdownRef = useRef<HTMLDivElement>(null)
  const modalStatusDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseModal()
      }
    }

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showModal])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false)
      }
      if (modalCategoryDropdownRef.current && !modalCategoryDropdownRef.current.contains(event.target as Node)) {
        setShowModalCategoryDropdown(false)
      }
      if (modalStatusDropdownRef.current && !modalStatusDropdownRef.current.contains(event.target as Node)) {
        setShowModalStatusDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [assets, setAssets] = useState<Asset[]>([
    {
      id: "1",
      name: 'MacBook Pro M1 13" (2021)',
      assignedTo: "Wikki",
      category: "Laptop",
      serialNumber: "C03VM2MJGQ0D",
      status: "active",
      dateAdded: "2024-01-15",
    },
    {
      id: "2",
      name: "MacBook Air M1 (2020)",
      assignedTo: "Sowmiya",
      category: "Laptop",
      serialNumber: "D04LY8N3KYOA",
      status: "active",
      dateAdded: "2024-02-10",
    },

    {
      id: "3",
      name: 'Monitor MSI 27"',
      assignedTo: "Suruthiga",
      category: "Monitor",
      serialNumber: "G08MRZ8L34C",
      status: "maintenance",
      dateAdded: "2024-01-20",
    },
    {
      id: "4",
      name: "Magic Mouse Apple Gen 2",
      assignedTo: "Sumathi",
      category: "Accessory",
      serialNumber: "H07TN0PS21D",
      status: "active",
      dateAdded: "2024-03-05",
    },
    {
      id: "5",
      name: 'Apple 32" Pro Display XDR',
      assignedTo: "Ammu",
      category: "Monitor",
      serialNumber: "J08Q04C9XF8E",
      status: "active",
      dateAdded: "2024-02-28",
    },
    {
      id: "6",
      name: "ThinkPad X1 Carbon",
      assignedTo: "Sivasankar",
      category: "Laptop",
      serialNumber: "H07TN0PS21D",
      status: "maintenance",
      dateAdded: "2024-03-05",
    },
    {
      id: "7",
      name: "Wireless Keyboard Logitech",
      assignedTo: "Raajes",
      category: "Accessory",
      serialNumber: "H07TN0PS21D",
      status: "active",
      dateAdded: "2024-03-05",
    },
    {
      id: "8",
      name: "Magic Mouse Apple Gen 2",
      assignedTo: "Surya",
      category: "Accessory",
      serialNumber: "H07TN0PS21D",
      status: "active",
      dateAdded: "2024-03-05",
    },
    {
      id: "9",
      name: "Dell XPS 13",
      assignedTo: "John",
      category: "Laptop",
      serialNumber: "DXP13001",
      status: "active",
      dateAdded: "2024-03-10",
    },
    {
      id: "10",
      name: "Samsung Monitor 24",
      assignedTo: "Jane",
      category: "Monitor",
      serialNumber: "SM24001",
      status: "active",
      dateAdded: "2024-03-12",
    },
    {
      id: "11",
      name: "Logitech Keyboard",
      assignedTo: "Bob",
      category: "Accessory",
      serialNumber: "LK001",
      status: "maintenance",
      dateAdded: "2024-03-15",
    },
    {
      id: "12",
      name: "HP Laptop",
      assignedTo: "Alice",
      category: "Laptop",
      serialNumber: "HP001",
      status: "active",
      dateAdded: "2024-03-18",
    },
    {
      id: "13",
      name: "LG Monitor 27",
      assignedTo: "Charlie",
      category: "Monitor",
      serialNumber: "LG27001",
      status: "returned",
      dateAdded: "2024-03-20",
    },
    {
      id: "14",
      name: "Wireless Mouse",
      assignedTo: "David",
      category: "Accessory",
      serialNumber: "WM001",
      status: "active",
      dateAdded: "2024-03-22",
    },
    {
      id: "15",
      name: "ThinkPad X1",
      assignedTo: "Eva",
      category: "Laptop",
      serialNumber: "TPX1001",
      status: "active",
      dateAdded: "2024-03-25",
    },
  ])

  const [newAsset, setNewAsset] = useState<Omit<Asset, "id" | "dateAdded">>({
    name: "",
    assignedTo: "",
    category: "",
    serialNumber: "",
    status: "active",
  })

  const categories = ["all", "Laptop", "Monitor", "Accessory"]

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddAsset = (): void => {
    if (newAsset.name && newAsset.assignedTo && newAsset.category && newAsset.serialNumber) {
      const asset: Asset = {
        ...newAsset,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString().split("T")[0],
      }
      setAssets([...assets, asset])
      setNewAsset({
        name: "",
        assignedTo: "",
        category: "",
        serialNumber: "",
        status: "active",
      })
      setShowModal(false)
      toast.success("Asset added successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleEditAsset = (asset: Asset): void => {
    setEditingAsset(asset)
    setNewAsset({
      name: asset.name,
      assignedTo: asset.assignedTo,
      category: asset.category,
      serialNumber: asset.serialNumber,
      status: asset.status,
    })
    setShowModal(true)
  }

  const handleUpdateAsset = (): void => {
    if (editingAsset && newAsset.name && newAsset.assignedTo && newAsset.category && newAsset.serialNumber) {
      const updatedAssets = assets.map((asset) => (asset.id === editingAsset.id ? { ...asset, ...newAsset } : asset))
      setAssets(updatedAssets)
      setEditingAsset(null)
      setNewAsset({
        name: "",
        assignedTo: "",
        category: "",
        serialNumber: "",
        status: "active",
      })
      setShowModal(false)
      toast.success("Asset updated successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const handleDeleteAsset = (asset: Asset): void => {
    setAssetToDelete(asset)
    setShowDeleteModal(true)
  }

  const confirmDeleteAsset = (): void => {
    if (assetToDelete) {
      const updatedAssets = assets.filter((asset) => asset.id !== assetToDelete.id)
      setAssets(updatedAssets)
      setAssetToDelete(null)
      setShowDeleteModal(false)
    }
  }

  const handleCloseModal = (): void => {
    setShowModal(false)
    setEditingAsset(null)
    setShowModalCategoryDropdown(false)
    setShowModalStatusDropdown(false)
    setNewAsset({
      name: "",
      assignedTo: "",
      category: "",
      serialNumber: "",
      status: "active",
    })
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Laptop":
        return <Laptop className="w-4 h-4" />
      case "Monitor":
        return <Monitor className="w-4 h-4" />
      case "Accessory":
        return <Package className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800 border-emerald-200"
      case "maintenance":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "returned":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const [currentPage, setCurrentPage] = useState<number>(1)
  const assetsPerPage = 7

  const paginatedAssets = filteredAssets.slice((currentPage - 1) * assetsPerPage, currentPage * assetsPerPage)

  const totalPages = Math.ceil(filteredAssets.length / assetsPerPage)

  const generatePaginationItems = () => {
    const items = []
    const maxVisiblePages = 10

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i)
      }
    } else {
      const leftOffset = Math.floor(maxVisiblePages / 2)
      const rightOffset = Math.ceil(maxVisiblePages / 2) - 1

      if (currentPage <= leftOffset + 1) {
        for (let i = 1; i <= maxVisiblePages - 1; i++) {
          items.push(i)
        }
        items.push("ellipsis")
        items.push(totalPages)
      } else if (currentPage >= totalPages - rightOffset) {
        items.push(1)
        items.push("ellipsis")
        for (let i = totalPages - maxVisiblePages + 2; i <= totalPages; i++) {
          items.push(i)
        }
      } else {
        items.push(1)
        items.push("ellipsis")
        for (let i = currentPage - leftOffset + 1; i <= currentPage + rightOffset - 1; i++) {
          items.push(i)
        }
        items.push("ellipsis")
        items.push(totalPages)
      }
    }

    return items
  }

  const paginationItems = generatePaginationItems()

  const handleRowClick = (asset: Asset): void => {
    setSelectedAsset(asset)
    setShowDetailModal(true)
  }

  const getEmployeeDetails = (employeeName: string): Employee | null => {
    return employees.find((emp) => emp.name === employeeName) || null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative p-6 max-w-7xl mx-auto">
  
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-[#006666] bg-clip-text text-transparent mt-2 leading-relaxed pb-1">
            Asset Management
          </h1>

          <p className="text-slate-600">Manage and track your organization's assets</p>
        </div>

        
        <div className="mb-8 flex flex-row  gap-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assets, assignees, or serial numbers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[250px] pl-10 pr-4 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="relative" ref={categoryDropdownRef}>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="pl-10 pr-8 py-3 bg-white/70 border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer transition-all duration-200 flex items-center justify-between min-w-[180px]"
              >
                <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${showCategoryDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setShowCategoryDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                        selectedCategory === cat
                          ? "bg-from-teal-50 text-teal-700"
                          : "text-slate-700"
                      }`}
                    >
                      {cat !== "all" && getCategoryIcon(cat)}
                      <span>{cat === "all" ? "All Categories" : cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#006666] text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Asset
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Assets</p>
                <p className="text-2xl font-bold text-slate-800">{assets.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Active</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {assets.filter((a) => a.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Maintenance</p>
                <p className="text-2xl font-bold text-amber-600">
                  {assets.filter((a) => a.status === "maintenance").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Categories</p>
                <p className="text-2xl font-bold text-slate-800">{new Set(assets.map((a) => a.category)).size}</p>
              </div>
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#006666] text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-medium">Asset Details</th>
                  <th className="text-left px-6 py-4 font-medium">Assigned To</th>
                  <th className="text-left px-6 py-4 font-medium">Category</th>
                  <th className="text-left px-6 py-4 font-medium">Serial Number</th>
                  <th className="text-left px-6 py-4 font-medium">Status</th>
                  <th className="text-left px-6 py-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAssets.map((asset, index) => (
                  <tr
                    key={asset.id}
                    onClick={() => handleRowClick(asset)}
                    className="border-b border-slate-200/50 hover:bg-white/40 transition-all duration-200 group cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{asset.name}</p>
                          <p className="text-sm text-slate-500">Issued on {asset.dateAdded}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#006666] rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {asset.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="text-slate-700">{asset.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {getCategoryIcon(asset.category)}
                        {asset.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono text-slate-700">
                        {asset.serialNumber}
                      </code>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(asset.status)}`}
                      >
                        {String(asset.status).charAt(0).toUpperCase() + String(asset.status).slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditAsset(asset)
                          }}
                          className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteAsset(asset)
                          }}
                          className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-6">
            
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-[#006666] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </button>

        
            {paginationItems.map((item, index) => {
              if (item === "ellipsis") {
                return (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-500 select-none">
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={item}
                  onClick={() => setCurrentPage(item as number)}
                  className={`px-3 py-2 rounded-[60%] transition-all duration-200 ${
                    currentPage === item
                      ? "bg-[#006666] text-white shadow-lg"
                      : "bg-white/60 text-slate-700 hover:bg-white/80 border border-white/20"
                  }`}
                >
                  {item}
                </button>
              )
            })}

      
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-full bg-white/60 text-slate-700 hover:bg-[#006666] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/20"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </button>
          </div>
        )}

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No assets found</p>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>


      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100"
          >
            <h2 className="text-2xl font-bold bg-[#006666] bg-clip-text text-transparent mb-6">
              {editingAsset ? "Edit Asset" : "Add New Asset"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Asset Name</label>
                <input
                  type="text"
                  placeholder="Enter asset name"
                  value={newAsset.name}
                  onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Assigned To</label>
                <input
                  type="text"
                  placeholder="Enter assignee name"
                  value={newAsset.assignedTo}
                  onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                <div className="relative" ref={modalCategoryDropdownRef}>
                  <button
                    onClick={() => setShowModalCategoryDropdown(!showModalCategoryDropdown)}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all appearance-none flex items-center justify-between"
                  >
                    <span className={newAsset.category ? "text-slate-800" : "text-slate-500"}>
                      {newAsset.category || "Select category"}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showModalCategoryDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showModalCategoryDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                      {["Laptop", "Monitor", "Accessory"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => {
                            setNewAsset({ ...newAsset, category: cat })
                            setShowModalCategoryDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                            newAsset.category === cat
                              ? "bg-[#006666] text-teal-700"
                              : "text-slate-700"
                          }`}
                        >
                          {getCategoryIcon(cat)}
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Serial Number</label>
                <input
                  type="text"
                  placeholder="Enter serial number"
                  value={newAsset.serialNumber}
                  onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                <div className="relative" ref={modalStatusDropdownRef}>
                  <button
                    onClick={() => setShowModalStatusDropdown(!showModalStatusDropdown)}
                    className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all appearance-none flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(newAsset.status)}`}
                      >
                        {String(newAsset.status).charAt(0).toUpperCase() + String(newAsset.status).slice(1)}
                      </span>
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${showModalStatusDropdown ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showModalStatusDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                      {(["active", "maintenance", "returned"] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => {
                            setNewAsset({ ...newAsset, status })
                            setShowModalStatusDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                            newAsset.status === status ? "bg-[#006666]" : ""
                          }`}
                        >
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}
                          >
                            {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium"
              >
                Cancel
              </button>
              <button
                onClick={editingAsset ? handleUpdateAsset : handleAddAsset}
                className="flex-1 px-4 py-3 bg-[#006666] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
              >
                {editingAsset ? "Update Asset" : "Add Asset"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && assetToDelete && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#006666] rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-[white]" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800  mb-2">Delete Asset</h2>
              <p className="text-slate-600 mb-6">
                Are you sure you want to delete <span className="font-semibold">"{assetToDelete.name}"</span>? This
                action cannot be undone.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAsset}
                  className="flex-1 px-4 py-3 bg-[#006666] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Asset Detail Modal */}
      {showDetailModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 w-full max-w-4xl shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent">
                Asset Details
              </h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
        
              <div className="bg-white/60 rounded-xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-[#006666] rounded-lg text-white">
                    {getCategoryIcon(selectedAsset.category)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800">Asset Information</h3>
                    <p className="text-slate-600">Complete asset details</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Asset Name</label>
                      <p className="text-lg font-semibold text-slate-800">{selectedAsset.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Category</label>
                      <div className="flex items-center gap-2 mt-1">
                        {getCategoryIcon(selectedAsset.category)}
                        <span className="text-slate-800 font-medium">{selectedAsset.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600">Serial Number</label>
                      <code className="block bg-slate-100 px-3 py-2 rounded-lg text-sm font-mono text-slate-800 mt-1">
                        {selectedAsset.serialNumber}
                      </code>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Status</label>
                      <div className="mt-1">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedAsset.status)}`}
                        >
                          {String(selectedAsset.status).charAt(0).toUpperCase() + String(selectedAsset.status).slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">Date Added</label>
                    <p className="text-slate-800 font-medium mt-1">
                      {new Date(selectedAsset.dateAdded).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-slate-600">Asset ID</label>
                    <p className="text-slate-800 font-medium mt-1">#{selectedAsset.id}</p>
                  </div>
                </div>
              </div>

              {/* Employee Information */}
              <div className="bg-white/60 rounded-xl p-6 border border-white/20">
                {(() => {
                  const employee = getEmployeeDetails(selectedAsset.assignedTo)
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-[#006666] rounded-full flex items-center justify-center text-white text-lg font-medium">
                          {selectedAsset.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-800">Employee Information</h3>
                          <p className="text-slate-600">Assigned user details</p>
                        </div>
                      </div>

                      {employee ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-slate-600">Full Name</label>
                              <p className="text-lg font-semibold text-slate-800">{employee.name}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-600">Position</label>
                              <p className="text-slate-800 font-medium">{employee.position}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-slate-600">Department</label>
                              <p className="text-slate-800 font-medium">{employee.department}</p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-slate-600">Manager</label>
                              <p className="text-slate-800 font-medium">{employee.manager}</p>
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">Email Address</label>
                            <a
                              href={`mailto:${employee.email}`}
                              className="block text-teal-600 hover:text-teal-700 font-medium mt-1"
                            >
                              {employee.email}
                            </a>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">Phone Number</label>
                            <a
                              href={`tel:${employee.phone}`}
                              className="block text-teal-600 hover:text-teal-700 font-medium mt-1"
                            >
                              {employee.phone}
                            </a>
                          </div>

                          <div>
                            <label className="text-sm font-medium text-slate-600">Start Date</label>
                            <p className="text-slate-800 font-medium mt-1">
                              {new Date(employee.startDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg
                              className="w-8 h-8 text-slate-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>
                          </div>
                          <p className="text-slate-600">Employee details not found</p>
                          <p className="text-sm text-slate-500">Assigned to: {selectedAsset.assignedTo}</p>
                        </div>
                      )}
                    </>
                  )
                })()}
              </div>
            </div>

          
            <div className="flex gap-3 mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={() => {
                  setShowDetailModal(false)
                  handleEditAsset(selectedAsset)
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#006666] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Edit Asset
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="backdrop-blur-sm"
      />
    </div>
  )
}

export default AssetsManagement
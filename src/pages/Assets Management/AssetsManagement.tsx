"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Plus, Monitor, Laptop, Package, Edit3, Trash2, Filter } from "lucide-react"

interface Asset {
  id: string
  name: string
  assignedTo: string
  category: string
  serialNumber: string
  status: "active" | "maintenance" | "retired"
  dateAdded: string
}

const AssetsManagement: React.FC = () => {
  const [search, setSearch] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)

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
      asset.assignedTo.toLowerCase().includes(search.toLowerCase())
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
      case "retired":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 via-teal-800 to-cyan-800 bg-clip-text text-transparent mb-2">
            Asset Management
          </h1>
          <p className="text-slate-600">Manage and track your organization's assets</p>
        </div>

        {/* Controls */}
        <div className="mb-8 flex flex-row  gap-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search assets or assignees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[250px] pl-10 pr-4 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-white/70  border border-white/20 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 appearance-none cursor-pointer transition-all duration-200"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 font-medium"
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
              <thead className="bg-gradient-to-r from-slate-800 to-teal-700 text-white">
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
                {filteredAssets.map((asset, index) => (
                  <tr
                    key={asset.id}
                    className="border-b border-slate-200/50 hover:bg-white/40 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-slate-200 transition-colors">
                          {getCategoryIcon(asset.category)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{asset.name}</p>
                          <p className="text-sm text-slate-500">Added {asset.dateAdded}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                          onClick={() => handleEditAsset(asset)}
                          className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteAsset(asset)}
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

        {filteredAssets.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-600 text-lg">No assets found</p>
            <p className="text-slate-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Add/Edit Asset Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div
            ref={modalRef}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-teal-600 bg-clip-text text-transparent mb-6">
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
                <select
                  value={newAsset.category}
                  onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all appearance-none"
                >
                  <option value="">Select category</option>
                  <option value="Laptop">Laptop</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Accessory">Accessory</option>
                </select>
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
                <select
                  value={newAsset.status}
                  onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value as Asset["status"] })}
                  className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all appearance-none"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="retired">Retired</option>
                </select>
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
                className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
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
              <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AssetsManagement

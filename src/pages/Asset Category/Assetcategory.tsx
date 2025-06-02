"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AssetCategoryCard from "../../components/common/Asset-category/Assetcategorycard"
import AssetCategoryHeader from "../../components/common/Asset-category/Assetcategoryheader"
import CreateCategoryModal from "../../components/common/Asset-category/CreateCategoryModal"
import DeleteConfirmModal from "../../components/common/Asset-category/DeleteConfirmModal"
import EditAssetModal from "../../components/common/Asset-category/EditAssetModal"
import DeleteAssetModal from "../../components/common/Asset-category/DeleteConfirmModal"
import AssetDetailsCard from "../../components/common/Asset-category/AssetDetailsCard"
import AddAssetModal from "../../components/common/Asset-category/AddAssetModal"


interface Asset {
  id: string
  name: string
  status: "Available" | "Not-Available"
  trackingId: string
  batchNo: string
  avatar: string
  avatarBg: string
  description?: string
  category?: string
  purchaseDate?: string
  cost?: string
  expiryDate?: string
}

interface AssetCategory {
  category: string
  count: number
  description?: string
  assets: Asset[]
}

const AssetCategory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditAssetModal, setShowEditAssetModal] = useState(false)
  const [showDeleteAssetModal, setShowDeleteAssetModal] = useState(false)
  const [showAssetDetailsCard, setShowAssetDetailsCard] = useState(false)
  const [showAddAssetModal, setShowAddAssetModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<string>("")
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedCategoryForAsset, setSelectedCategoryForAsset] = useState<string>("")

  // Refs for click outside detection
  const createModalRef = useRef<HTMLDivElement>(null)
  const deleteModalRef = useRef<HTMLDivElement>(null)
  const editAssetModalRef = useRef<HTMLDivElement>(null)
  const deleteAssetModalRef = useRef<HTMLDivElement>(null)
  const assetDetailsCardRef = useRef<HTMLDivElement>(null)
  const addAssetModalRef = useRef<HTMLDivElement>(null)

  // Sample data with multiple categories
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([
    {
      category: "laptops",
      count: 8,
      description: "Portable computing devices",
      assets: [
        {
          id: "1",
          name: "Google Pixelbook Go",
          status: "Available" as const,
          trackingId: "LPT0039",
          batchNo: "LPB002",
          avatar: "GG",
          avatarBg: "bg-yellow-500",
          description: "Lightweight Chromebook with 12-hour battery life",
          category: "laptops",
          purchaseDate: "2023-05-15",
          cost: "649.00",
          expiryDate: "2026-05-15",
        },
        {
          id: "2",
          name: "Microsoft Surface Laptop 4",
          status: "Not-Available" as const,
          trackingId: "LPT0038",
          batchNo: "LPB002",
          avatar: "M4",
          avatarBg: "bg-orange-500",
          description: "13.5-inch touchscreen laptop with AMD Ryzen processor",
          category: "laptops",
          purchaseDate: "2023-06-20",
          cost: "999.99",
          expiryDate: "2026-06-20",
        },
        {
          id: "3",
          name: "Panasonic Toughbook 55",
          status: "Available" as const,
          trackingId: "LPT0037",
          batchNo: "LPB002",
          avatar: "P5",
          avatarBg: "bg-cyan-500",
          description: "Rugged laptop for field operations",
          category: "laptops",
          purchaseDate: "2023-04-10",
          cost: "1899.00",
          expiryDate: "2026-04-10",
        },
        {
          id: "4",
          name: "Gigabyte AERO 15 OLED",
          status: "Not-Available" as const,
          trackingId: "LPT0036",
          batchNo: "LPB002",
          avatar: "GO",
          avatarBg: "bg-blue-600",
          description: "Gaming laptop with OLED display",
          category: "laptops",
          purchaseDate: "2023-07-05",
          cost: "1799.00",
          expiryDate: "2026-07-05",
        },
        {
          id: "5",
          name: "Alienware m15 R4",
          status: "Available" as const,
          trackingId: "LPT0035",
          batchNo: "LPB002",
          avatar: "AR",
          avatarBg: "bg-gray-600",
          description: "High-performance gaming laptop",
          category: "laptops",
          purchaseDate: "2023-03-22",
          cost: "2199.00",
          expiryDate: "2026-03-22",
        },
        {
          id: "6",
          name: "Fujitsu Lifebook U9311",
          status: "Available" as const,
          trackingId: "LPT0034",
          batchNo: "LPB002",
          avatar: "FU",
          avatarBg: "bg-blue-500",
          description: "Ultra-lightweight business laptop",
          category: "laptops",
          purchaseDate: "2023-02-18",
          cost: "1599.00",
          expiryDate: "2026-02-18",
        },
        {
          id: "7",
          name: "Sony Vaio S13",
          status: "Available" as const,
          trackingId: "LPT0033",
          batchNo: "LPB002",
          avatar: "SS",
          avatarBg: "bg-yellow-600",
          description: "13-inch business laptop",
          category: "laptops",
          purchaseDate: "2023-01-30",
          cost: "1299.00",
          expiryDate: "2026-01-30",
        },
        {
          id: "8",
          name: "Toshiba Portege X30T",
          status: "Available" as const,
          trackingId: "LPT0032",
          batchNo: "LPB002",
          avatar: "TX",
          avatarBg: "bg-yellow-500",
          description: "Detachable 2-in-1 business laptop",
          category: "laptops",
          purchaseDate: "2023-08-12",
          cost: "1499.00",
          expiryDate: "2026-08-12",
        },
      ],
    },
    {
      category: "monitors",
      count: 3,
      description: "Display devices and screens",
      assets: [
        {
          id: "9",
          name: "Dell UltraSharp 27",
          status: "Available" as const,
          trackingId: "MON0015",
          batchNo: "MOB001",
          avatar: "DU",
          avatarBg: "bg-blue-500",
          description: "27-inch 4K monitor with USB-C",
          category: "monitors",
          purchaseDate: "2023-05-20",
          cost: "499.99",
          expiryDate: "2028-05-20",
        },
        {
          id: "10",
          name: "LG 4K Monitor 32",
          status: "Available" as const,
          trackingId: "MON0014",
          batchNo: "MOB001",
          avatar: "LG",
          avatarBg: "bg-red-500",
          description: "32-inch UHD display with HDR",
          category: "monitors",
          purchaseDate: "2023-06-15",
          cost: "599.99",
          expiryDate: "2028-06-15",
        },
        {
          id: "11",
          name: "Samsung Curved 34",
          status: "Not-Available" as const,
          trackingId: "MON0013",
          batchNo: "MOB001",
          avatar: "SC",
          avatarBg: "bg-purple-500",
          description: "34-inch ultrawide curved monitor",
          category: "monitors",
          purchaseDate: "2023-04-05",
          cost: "699.99",
          expiryDate: "2028-04-05",
        },
      ],
    },
  ])

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (createModalRef.current && !createModalRef.current.contains(event.target as Node) && showCreateModal) {
        setShowCreateModal(false)
        setEditingCategory(null)
      }
      if (deleteModalRef.current && !deleteModalRef.current.contains(event.target as Node) && showDeleteModal) {
        setShowDeleteModal(false)
        setCategoryToDelete("")
      }
      if (
        editAssetModalRef.current &&
        !editAssetModalRef.current.contains(event.target as Node) &&
        showEditAssetModal
      ) {
        setShowEditAssetModal(false)
        setEditingAsset(null)
      }
      if (
        deleteAssetModalRef.current &&
        !deleteAssetModalRef.current.contains(event.target as Node) &&
        showDeleteAssetModal
      ) {
        setShowDeleteAssetModal(false)
        setAssetToDelete(null)
      }
      if (
        assetDetailsCardRef.current &&
        !assetDetailsCardRef.current.contains(event.target as Node) &&
        showAssetDetailsCard
      ) {
        setShowAssetDetailsCard(false)
        setSelectedAsset(null)
      }
      if (addAssetModalRef.current && !addAssetModalRef.current.contains(event.target as Node) && showAddAssetModal) {
        setShowAddAssetModal(false)
        setSelectedCategoryForAsset("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [
    showCreateModal,
    showDeleteModal,
    showEditAssetModal,
    showDeleteAssetModal,
    showAssetDetailsCard,
    showAddAssetModal,
  ])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  const handleFilter = () => {
    console.log("Filter clicked")
  }

  const handleCreateCategory = () => {
    setEditingCategory(null)
    setShowCreateModal(true)
  }

  const handleEditCategory = (category: string) => {
    setEditingCategory(category)
    setShowCreateModal(true)
  }

  const handleDeleteCategory = (category: string) => {
    setCategoryToDelete(category)
    setShowDeleteModal(true)
  }

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset)
    setShowEditAssetModal(true)
  }

  const handleDeleteAsset = (asset: Asset) => {
    setAssetToDelete(asset)
    setShowDeleteAssetModal(true)
  }

  const handleViewAsset = (asset: Asset) => {
    setSelectedAsset(asset)
    setShowAssetDetailsCard(true)
  }

  const handleAddAsset = (category: string) => {
    setSelectedCategoryForAsset(category)
    setShowAddAssetModal(true)
  }

  const handleSubmitCategory = (categoryData: { name: string; description: string }) => {
    if (editingCategory) {
      // Update existing category
      setAssetCategories((prev) =>
        prev.map((cat) =>
          cat.category === editingCategory
            ? { ...cat, category: categoryData.name.toLowerCase(), description: categoryData.description }
            : cat,
        ),
      )
      toast.success("Category updated successfully!", {
        toastId: "category-update",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } else {
      // Create new category
      const newCategory: AssetCategory = {
        category: categoryData.name.toLowerCase(),
        count: 0,
        description: categoryData.description,
        assets: [],
      }
      setAssetCategories((prev) => [...prev, newCategory])
      toast.success("Category created successfully!", {
        toastId: "category-create",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
    setShowCreateModal(false)
    setEditingCategory(null)
  }

  const handleConfirmDelete = () => {
    setAssetCategories((prev) => prev.filter((cat) => cat.category !== categoryToDelete))
    setShowDeleteModal(false)
    setCategoryToDelete("")
    toast.success("Category deleted successfully!", {
      toastId: "category-delete",
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleSaveAsset = (updatedAsset: Asset) => {
    setAssetCategories((prev) =>
      prev.map((category) => ({
        ...category,
        assets: category.assets.map((asset) => (asset.id === updatedAsset.id ? updatedAsset : asset)),
        count: category.assets.length,
      })),
    )
    setShowEditAssetModal(false)
    setEditingAsset(null)

    // Show success toast with unique ID
    toast.success("Asset updated successfully!", {
      toastId: "asset-update",
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleAddNewAsset = (newAssetData: Omit<Asset, "id">) => {
    const newAsset: Asset = {
      ...newAssetData,
      id: Date.now().toString(),
    }

    setAssetCategories((prev) =>
      prev.map((category) => {
        if (category.category === selectedCategoryForAsset) {
          return {
            ...category,
            assets: [...category.assets, newAsset],
            count: category.assets.length + 1,
          }
        }
        return category
      }),
    )

    setShowAddAssetModal(false)
    setSelectedCategoryForAsset("")

    // Show success toast with unique ID
    toast.success("Asset added successfully!", {
      toastId: "asset-add",
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleConfirmDeleteAsset = () => {
    if (assetToDelete) {
      setAssetCategories((prev) =>
        prev.map((category) => ({
          ...category,
          assets: category.assets.filter((asset) => asset.id !== assetToDelete.id),
          count: category.assets.filter((asset) => asset.id !== assetToDelete.id).length,
        })),
      )
      setShowDeleteAssetModal(false)
      setAssetToDelete(null)

      // Show success toast with unique ID
      toast.success("Asset deleted successfully!", {
        toastId: "asset-delete",
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  // Filter categories based on search query
  const filteredCategories = assetCategories.filter((category) => {
    if (!searchQuery) return true

    // Check if category name matches
    if (category.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true
    }

    // Check if any asset in the category matches
    return category.assets.some(
      (asset) =>
        asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.trackingId.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  })

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <AssetCategoryHeader
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onCreate={handleCreateCategory}
        />

        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500">
                  {searchQuery ? (
                    <>
                      <p className="text-lg mb-2">No results found</p>
                      <p>No categories or assets match your search for "{searchQuery}"</p>
                    </>
                  ) : (
                    <>
                      <p className="text-lg mb-2">No asset categories</p>
                      <p>Create your first asset category to get started</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              filteredCategories.map((category, index) => (
                <AssetCategoryCard
                  key={index}
                  category={category.category}
                  count={category.count}
                  assets={category.assets}
                  searchQuery={searchQuery}
                  onEditCategory={handleEditCategory}
                  onDeleteCategory={handleDeleteCategory}
                  onEditAsset={handleEditAsset}
                  onDeleteAsset={handleDeleteAsset}
                  onViewAsset={handleViewAsset}
                  onAddAsset={handleAddAsset}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={createModalRef}>
            <CreateCategoryModal
              isOpen={showCreateModal}
              onClose={() => {
                setShowCreateModal(false)
                setEditingCategory(null)
              }}
              onSubmit={handleSubmitCategory}
              editingCategory={editingCategory}
            />
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={deleteModalRef}>
            <DeleteConfirmModal
              isOpen={showDeleteModal}
              onClose={() => {
                setShowDeleteModal(false)
                setCategoryToDelete("")
              }}
              onConfirm={handleConfirmDelete}
              categoryName={categoryToDelete}
            />
          </div>
        </div>
      )}

      {showEditAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={editAssetModalRef}>
            <EditAssetModal
              isOpen={showEditAssetModal}
              onClose={() => {
                setShowEditAssetModal(false)
                setEditingAsset(null)
              }}
              onSave={handleSaveAsset}
              asset={editingAsset}
            />
          </div>
        </div>
      )}

      {showDeleteAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={deleteAssetModalRef}>
            <DeleteAssetModal
              isOpen={showDeleteAssetModal}
              onClose={() => {
                setShowDeleteAssetModal(false)
                setAssetToDelete(null)
              }}
              onConfirm={handleConfirmDeleteAsset}
              categoryName={assetToDelete?.name || ""}
            />
          </div>
        </div>
      )}

      {showAssetDetailsCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={assetDetailsCardRef}>
            <AssetDetailsCard
              isOpen={showAssetDetailsCard}
              onClose={() => {
                setShowAssetDetailsCard(false)
                setSelectedAsset(null)
              }}
              asset={selectedAsset}
              onEdit={handleEditAsset}
            />
          </div>
        </div>
      )}

      {showAddAssetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={addAssetModalRef}>
            <AddAssetModal
              isOpen={showAddAssetModal}
              onClose={() => {
                setShowAddAssetModal(false)
                setSelectedCategoryForAsset("")
              }}
              onSave={handleAddNewAsset}
              category={selectedCategoryForAsset}
            />
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
        limit={3}
        containerId="main-toast-container"
      />
    </div>
  )
}

export default AssetCategory

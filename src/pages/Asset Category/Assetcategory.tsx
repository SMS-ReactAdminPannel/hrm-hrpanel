

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AssetCategoryCard from "../../components/common/Asset-category/AssetCategoryCard"
import AssetCategoryHeader from "../../components/common/Asset-category/AssetCategoryHeader"
import CreateCategoryModal from "../../components/common/Asset-category/CreateCategoryModal"
import DeleteConfirmModal from "../../components/common/Asset-category/DeleteConfirmModal"
import EditAssetModal from "../../components/common/Asset-category/EditAssetModal"
import DeleteAssetModal from "../../components/common/Asset-category/DeleteConfirmModal"
import AssetDetailsCard from "../../components/common/Asset-category/AssetDetailsCard"
import AddAssetModal from "../../components/common/Asset-category/AddAssetModal"
import { getAllAssetcategory } from "../../features/assetcategory/service"


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

  const createModalRef = useRef<HTMLDivElement>(null)
  const deleteModalRef = useRef<HTMLDivElement>(null)
  const editAssetModalRef = useRef<HTMLDivElement>(null)
  const deleteAssetModalRef = useRef<HTMLDivElement>(null)
  const assetDetailsCardRef = useRef<HTMLDivElement>(null)
  const addAssetModalRef = useRef<HTMLDivElement>(null)
  
  const [assetCategories, setAssetCategories] = useState<AssetCategory[]>([
   
  ])
  
  const fetchAllAssestcategory= async () => {
     try{
const response:any= await getAllAssetcategory() 
console.log(response.data.data, 'response data')
        if(response){
             setAssetCategories(response?.data)
        }
}
catch (error) {
    console.error("Error fetching assetcategory:", error);
  }
  };

  useEffect(() => {
    fetchAllAssestcategory();
  }, []);

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

  
  const filteredCategories = assetCategories?.filter((category) => {
    if (!searchQuery) return true


    if (category?.category_name?.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true
    }

    
    return category?.assets.some(
      (asset) =>
        asset?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset?.trackingId.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  })




  return (
    <div className=" min-h-screen ">
      <div className="container ">
        <AssetCategoryHeader
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onCreate={handleCreateCategory}
        />

        <div className="">
          <div className="max-w-full mx-auto">
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
              filteredCategories?.map((category, index) => (
                <AssetCategoryCard
                  key={index}
                  category={category?.category_name}
                  count={category?.count}
                  assets={category?.asset}
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

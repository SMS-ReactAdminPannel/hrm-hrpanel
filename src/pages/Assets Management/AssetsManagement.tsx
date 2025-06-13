"use client"

import { useState } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import type { Asset,Employee } from "../../components/AssetManagement/types/assets"
import { mockAssets,mockEmployees } from "../../components/AssetManagement/data/mock-data"
import AssetsHeader from "../../components/AssetManagement/asset-header"
import StatsCards from "../../components/AssetManagement/stats-card"
import AssetsTable from "../../components/AssetManagement/asset-table"
import Pagination from "../../components/AssetManagement/pagination"
import AddEditAssetModal from "../../components/AssetManagement/Modals/add-edit-asset-model"
import DeleteAssetModal from "../../components/AssetManagement/Modals/delete-asset-modal"
import AssetDetailsModal from "../../components/AssetManagement/Modals/asset-detail-modal"
import EmptyState from "../../components/AssetManagement/empty-state"

export default function AssetsManagementPage() {
  const [search, setSearch] = useState<string>("")
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false)
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null)
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [assets, setAssets] = useState<Asset[]>(mockAssets)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const assetsPerPage = 7

  const [newAsset, setNewAsset] = useState<Omit<Asset, "id" | "dateAdded">>({
    name: "",
    assignedTo: "",
    category: "",
    serialNumber: "",
    status: "active",
  })

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.assignedTo.toLowerCase().includes(search.toLowerCase()) ||
      asset.serialNumber.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = selectedCategory === "all" || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const paginatedAssets = filteredAssets.slice((currentPage - 1) * assetsPerPage, currentPage * assetsPerPage)
  const totalPages = Math.ceil(filteredAssets.length / assetsPerPage)

  const handleAddAsset = (): void => {
    if (newAsset.name && newAsset.assignedTo && newAsset.category && newAsset.serialNumber) {
      const asset: Asset = {
        ...newAsset,
        id: Date.now().toString(),
        dateAdded: new Date().toISOString().split("T")[0],
      }
      setAssets([...assets, asset])
      resetForm()
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
      resetForm()
    }
  }

  const handleDeleteAsset = (asset: Asset): void => {
    setAssetToDelete(asset)
    setShowDeleteModal(true)
  }

  const confirmDeleteAsset = (): void => {
    if (assetToDelete) {
      setAssets((prev) => prev.filter((a) => a.id !== assetToDelete.id))
      setAssetToDelete(null)
      setShowDeleteModal(false)
    }
  }

  const resetForm = (): void => {
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

  const handleRowClick = (asset: Asset): void => {
    setSelectedAsset(asset)
    setShowDetailModal(true)
  }

  const getEmployeeDetails = (employeeName: string): Employee | null => {
    return mockEmployees.find((emp:any) => emp.name === employeeName) || null
  }

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative max-w-full">
        <AssetsHeader
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setShowModal={setShowModal}
        />

        <StatsCards assets={assets} />

        <AssetsTable
          assets={paginatedAssets}
          handleRowClick={handleRowClick}
          handleEditAsset={handleEditAsset}
          handleDeleteAsset={handleDeleteAsset}
        />

        {filteredAssets.length === 0 && <EmptyState />}

        {totalPages > 1 && (
          <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        )}
      </div>

      {showModal && (
        <AddEditAssetModal
          newAsset={newAsset}
          setNewAsset={setNewAsset}
          editingAsset={editingAsset}
          handleAddAsset={handleAddAsset}
          handleUpdateAsset={handleUpdateAsset}
          handleCloseModal={resetForm}
        />
      )}

      {showDeleteModal && assetToDelete && (
        <DeleteAssetModal
          assetToDelete={assetToDelete}
          confirmDeleteAsset={confirmDeleteAsset}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}

      {showDetailModal && selectedAsset && (
        <AssetDetailsModal
          selectedAsset={selectedAsset}
          getEmployeeDetails={getEmployeeDetails}
          setShowDetailModal={setShowDetailModal}
          handleEditAsset={handleEditAsset}
        />
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

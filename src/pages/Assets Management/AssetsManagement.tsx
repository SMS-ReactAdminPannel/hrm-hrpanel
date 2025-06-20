

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Search, Plus, Monitor, Laptop, Package, Edit3, Trash2, Filter } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FONTS } from "../../constants/uiConstants"
import httpClient from "../../api/httpClient";
import { API_END_POINTS } from "../../api/httpEndpoints";


interface Asset {
  [x: string]: any
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
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await httpClient.get(API_END_POINTS.asset.getAllAssets);
        console.log(res.data); // Optional: Debug
        setAssets(res.data);   // Make sure response is the array
      } catch (err) {
        console.error("Error fetching assets:", err);
      }
    };
  
    fetchAssets();
  }, []);
  
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3002/asset-categories") // Adjust path if needed
  //     .then((res) => {
  //       const categoryList = res.data.map((cat: any) => cat.name || cat.category); // match backend shape
  //       setCategories(categoryList);
  //     })
  //     .catch((err) => {
  //       console.error("Failed to fetch categories", err);
  //     });
  // }, []);
  

   
  

  const [newAsset, setNewAsset] = useState<Omit<Asset, "id" | "dateAdded">>({
    name: "",
    assignedTo: "",
    category: "",
    serialNumber: "",
    status: "active",
  })

  const categories = ["all", "Laptop", "Monitor", "Accessory"]

  const filteredAssets = assets.filter((asset) => {
    const searchLower = search.toLowerCase();
    return (
      asset.name?.toLowerCase().includes(searchLower) ||
      asset.assignedTo?.toLowerCase().includes(searchLower) ||
      asset.serialNumber?.toLowerCase().includes(searchLower)
    );
  });
  

 
  const handleAddAsset = async (): Promise<void> => {
    try {
      const res = await httpClient.post(API_END_POINTS.asset.createAsset, {
        ...newAsset,
        dateAdded: new Date().toISOString().split("T")[0],
      });
  
      setAssets((prev) => [...prev, res.data]);
  
      setNewAsset({
        name: "",
        assignedTo: "",
        category: "",
        serialNumber: "",
        status: "active",
      });
  
      setShowModal(false);
      toast.success("Asset added successfully!");
    } catch (err) {
      console.error("Error adding asset", err);
      toast.error("Failed to add asset");
    }
  };
  

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

  const handleUpdateAsset = async (): Promise<void> => {
    if (!editingAsset) return;
  
    try {
      const updated = {
        ...editingAsset,
        ...newAsset,
      };
  
      await httpClient.update(API_END_POINTS.asset.updateAsset(editingAsset._id), updated);
  
      setAssets((prev) =>
        prev.map((a) => (a._id === editingAsset._id ? { ...updated, _id: editingAsset._id } : a))
      );
  
      setEditingAsset(null);
      setShowModal(false);
      setNewAsset({
        name: "",
        assignedTo: "",
        category: "",
        serialNumber: "",
        status: "active",
      });
  
      toast.success("Asset updated successfully!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error("Failed to update asset", error);
      toast.error("Failed to update asset.");
    }
  };
  
  
  

  const handleDeleteAsset = (asset: Asset): void => {
    setAssetToDelete(asset)
    setShowDeleteModal(true)
  }

  const confirmDeleteAsset = async (): Promise<void> => {
    if (assetToDelete) {
      try {
        await httpClient.delete(API_END_POINTS.asset.deleteAsset(assetToDelete._id));
        setAssets((prev) => prev.filter((a) => a._id !== assetToDelete._id));
        setAssetToDelete(null);
        setShowDeleteModal(false);
  
        toast.success("Asset deleted successfully!", {
          position: "top-right",
          autoClose: 1500,
        });
      } catch (err) {
        console.error("Failed to delete asset", err);
        toast.error("Failed to delete asset", {
          position: "top-right",
        });
      }
    }
  };
  
  


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
    <div className="min-h-screen">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        
      </div>

      <div className="relative max-w-full ">
  
        <div className="mb-6">
          <h1 className=" text-[black] leading-relaxed" style={{...FONTS.header}}>
            Asset 
          </h1>

          <p  style={{...FONTS.cardSubHeader}}>Manage and track your organization's assets</p>
        </div>

        
        <div className="mb-8 flex flex-row  gap-4">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
            required
              type="text"
              placeholder="Search assets, assignees, or serial numbers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ ...FONTS.paragraph }}
              className="w-[250px] pl-10 pr-4 py-2 bg-[#eff4f5]  border border-white/20 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div className="flex gap-3 ml-auto">
            <div className="relative" ref={categoryDropdownRef}>
              <Filter className="absolute !text-white left-3 top-1/2 transform -translate-y-1/2 !text-slate-400 w-5  z-10" />
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="pl-10 pr-8 py-2 bg-[#5e59a9]/70 !text-white rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 cursor-pointer transition-all duration-200 flex items-center justify-between min-w-[180px]"
                style={{ ...FONTS.button }}
              >
                <span>{selectedCategory === "all" ? "All Categories" : selectedCategory}</span>
                <svg
                  className={`w-4 text-white transition-transform duration-200 ${showCategoryDropdown ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#eff4f5]  backdrop-blur-sm border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
                  {/* bg-[#eff4f5] */}
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat)
                        setShowCategoryDropdown(false)
                      }}
                      className={`w-full px-4 py-3 text-left !text-black hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                        selectedCategory === cat
                        ? "bg-[#5e59a9]/70 !text-[#006666] font-medium shadow-sm"
            : "text-slate-700 hover:text-[#006666]"
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
              className="flex items-center gap-2 px-3 py-2 bg-[#5e59a9]/70 text-white rounded-md shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-200 "
              style={{ ...FONTS.button}}
           >
              <Plus className=" " />
              Add Asset
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="!text-slate-600 text-sm"
                  style={{ ...FONTS.cardheader }}>Total Assets</p>
                <p className="text-2xl font-bold text-slate-800">{assets.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="!text-slate-600 text-sm"
                  style={{ ...FONTS.cardheader }}>Active</p>
                <p className="text-2xl font-bold text-emerald-600">
                  {assets.filter((a) => a.status === "active").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="!text-slate-600 text-sm"
                  style={{ ...FONTS.cardheader }}>Maintenance</p>
                <p className="text-2xl font-bold text-amber-600">
                  {assets.filter((a) => a.status === "maintenance").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg p-6 shadow border border-white/20 hover:shadow-xl transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="!text-slate-600 text-sm"
                  style={{ ...FONTS.cardheader }}>Categories</p>
                <p className="text-2xl font-bold text-slate-800">{new Set(assets.map((a) => a.category)).size}</p>
              </div>
              <Filter className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-[#eff4f5] backdrop-blur-sm rounded-lg shadow border border-white/20 overflow-hidden">
          <div className="overflow-x-auto"
            style={{ ...FONTS.paragraph}}>
            <table className="w-full ">
              <thead className="bg-[#5e59a9]/70 backdrop-blur-sm text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-md">Asset Details</th>
                  <th className="text-left px-6 py-4 font-md">Assigned To</th>
                  <th className="text-left px-6 py-4 font-md">Category</th>
                  <th className="text-left px-6 py-4 font-md">Serial Number</th>
                  <th className="text-left px-6 py-4 font-md">Status</th>
                  <th className="text-left px-6 py-4 font-md">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAssets.map((asset, index) => (
                  <tr
                    key={asset.id}
                    onClick={() => handleRowClick(asset)}
                    className="border-b border-slate-200/50 transition-all duration-200 group cursor-pointer"
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
                        {/* <div className="w-8 h-8 bg-[#006666] rounded-md flex items-center justify-center text-white text-sm font-medium">
                          {asset.assignedTo
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div> */}
                        <span className="text-slate-700">{asset.assignedTo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-sm">
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
                        className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(asset.status)}`}
                      >
                        {String(asset.status).charAt(0).toUpperCase() + String(asset.status).slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-2">
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
      className="bg-white/90 backdrop-blur-sm rounded-md p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold bg-[#006666] bg-clip-text !text-black text-transparent mb-6"
              style={{ ...FONTS.header2 }}>
        {editingAsset ? "Edit Asset" : "Add New Asset"}
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          editingAsset ? handleUpdateAsset() : handleAddAsset();
        }}
        className="space-y-4"
      >
        {/* Asset Name */}
        <div>
          <label className="block text-sm font-medium !text-slate-700 mb-2"
                  style={{ ...FONTS.paragraph }}>Asset Name</label>
          <input
            type="text"
            required
            placeholder="Enter asset name"
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                  style={{ ...FONTS.paragraph }}
            className="w-full px-4 py-3 bg-white/70 border !text-black border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
          />
        </div>

        {/* Assigned To */}
        <div>
          <label className="block text-sm font-medium !text-slate-700 mb-2"
                  style={{ ...FONTS.paragraph }}>Assigned To</label>
          <input
            type="text"
            required
            placeholder="Enter assignee name"
            value={newAsset.assignedTo}
            onChange={(e) => setNewAsset({ ...newAsset, assignedTo: e.target.value })}
                  style={{ ...FONTS.paragraph }}
            className="w-full px-4 py-3 bg-white/70 border !text-black border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium !text-slate-700 mb-2"
                  style={{ ...FONTS.paragraph }}>Category</label>
          <div className="relative" ref={modalCategoryDropdownRef}>
            <button
              type="button"
              onClick={() => setShowModalCategoryDropdown(!showModalCategoryDropdown)}
              className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-xl flex items-center justify-between focus:outline-none"
            >
              <span
                      style={{ ...FONTS.paragraph }} className={newAsset.category ? "!text-slate-800" : "!text-slate-500"}>
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
              <div className="absolute top-full left-0  right-0 mt-2 bg-white/95 backdrop-blur-sm border border-[#006666]/20 rounded-md shadow-xl z-50 overflow-hidden">
                {["Laptop", "Monitor", "Accessory"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setNewAsset({ ...newAsset, category: cat });
                      setShowModalCategoryDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left !text-black hover:bg-gradient-to-r hover:from-[#006666]/5 hover:to-[#006666]/10 transition-all duration-200 flex items-center gap-3 border-b border-gray-100 last:border-b-0 ${
                      newAsset.category === cat
                        ? "bg-[#006666]/10 text-[#006666] font-medium shadow-sm"
                        : "text-slate-700 hover:text-[#006666]"
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Hidden input to ensure required works */}
          <input type="text" value={newAsset.category} required hidden readOnly />
        </div>

        {/* Serial Number */}
        <div>
          <label className="block text-sm font-medium !text-slate-700 mb-2"
                  style={{ ...FONTS.paragraph }}>Serial Number</label>
          <input
            type="text"
            required
            placeholder="Enter serial number"
            value={newAsset.serialNumber}
            onChange={(e) => setNewAsset({ ...newAsset, serialNumber: e.target.value })}
                  style={{ ...FONTS.paragraph }}
            className="w-full px-4 py-3 bg-white/70 border !text-black
            border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all font-mono"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium !text-slate-700 mb-2"
                  style={{ ...FONTS.paragraph }}>Status</label>
          <div className="relative" ref={modalStatusDropdownRef}>
            <button
              type="button"
              onClick={() => setShowModalStatusDropdown(!showModalStatusDropdown)}
              className="w-full px-4 py-3 bg-white/70 border border-slate-200 rounded-md flex items-center justify-between focus:outline-none"
            >
              <span className="flex items-center gap-2"
                      style={{ ...FONTS.paragraph }}>
                <span
                  className={`inline-flex px-2 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                    newAsset.status
                  )}`}
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-white/20 rounded-md shadow-xl z-50 overflow-hidden">
                {(["active", "maintenance", "returned"] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setNewAsset({ ...newAsset, status });
                      setShowModalStatusDropdown(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 flex items-center gap-3 ${
                      newAsset.status === status ? "bg-[#006666]" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(
                        status
                      )}`}
                    >
                      {String(status).charAt(0).toUpperCase() + String(status).slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Hidden input for required enforcement */}
          <input type="text" value={newAsset.status} required hidden readOnly />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={handleCloseModal}
                  style={{ ...FONTS.paragraph }}
            className="flex-1 px-4 py-2 border border-slate-300 !text-slate-700 rounded-md hover:bg-slate-105 transition-all font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
                  style={{ ...FONTS.paragraph }}
            className="flex-1 px-4 py-2 bg-[#6f70ce] text-black rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
          >
            {editingAsset ? "Update Asset" : "Add Asset"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}


    
      {showDeleteModal && assetToDelete && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-md p-8 w-full max-w-md shadow-2xl border border-white/20 transform transition-all duration-300 scale-100">
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
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAsset}
                  className="flex-1 px-4 py-2 bg-[ text-white rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    
      {showDetailModal && selectedAsset && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-md p-4 w-full max-w-4xl shadow-2xl border border-white/20 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
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
        
              <div className="bg-white/60 rounded-md p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-[#006666] rounded-md text-white">
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
                      <code className="block bg-slate-100 px-3 py-2 rounded-md text-sm font-mono text-slate-800 mt-1">
                        {selectedAsset.serialNumber}
                      </code>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600">Status</label>
                      <div className="mt-1">
                        <span
                          className={`inline-flex px-3 py-1 rounded-md text-xs font-medium border ${getStatusColor(selectedAsset.status)}`}
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
              <div className="bg-white/60 rounded-md p-6 border border-white/20">
                {(() => {
                  const employee = getEmployeeDetails(selectedAsset.assignedTo)
                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 bg-[#006666] rounded-md flex items-center justify-center text-white text-md font-medium">
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
                className="flex items-center gap-2 px-4 py-2 bg-[#006666] text-white rounded-md hover:shadow-lg hover:scale-105 transition-all font-medium"
              >
                <Edit3 className="w-4 h-4" />
                Edit Asset
              </button>
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-all font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        
      )}<ToastContainer
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
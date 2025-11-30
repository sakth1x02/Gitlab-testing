"use client";

import type React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Calendar,
  User,
  Tag,
  Clock,
  Upload,
  X,
  ImageIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Lambda_url from "@/app/api/url";
import {
  saveBlogSeoToLambda,
  getSeoFromLambda,
  deleteSeoFromLambda,
} from "@/app/api/seoApi";
import type { Blog } from "@/types/blog";

interface BlogPost {
  id: string;
  metaTitle: string;
  metaDescription: string;
  author: string;
  publishDate: string;
  location: string;
  urlSlug: string;
  h1: string;
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  keywords: string[];
  category: string;
  subCategory: string;
  imageLink: string;
  imageTitle: string;
  imageAltText: string;
  imageAlignment: "left" | "center" | "right";
  uploadedImages: { url: string; name: string; alt: string }[];
  content: string;
  tableData: { headers: string[]; rows: string[][] };
  faqSection: { question: string; answer: string }[];
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  isactive: boolean;
}
type SeoPayload = {
  type: string;
  data: BlogPost;
};

const toolbarOptions = [
  [{ 'header': [1, 2, 3, false] }],
  ['bold', 'italic', 'underline'],
  [{ 'align': [] }],
  ['link'],
  ['clean']
];

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

export default function BlogManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    category: "",
    metaTitle: "",
    metaDescription: "",
    author: "",
    publishDate: "",
    location: "",
    urlSlug: "",
    h1: "",
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    keywords: [],
    subCategory: "",
    imageLink: "",
    imageTitle: "",
    imageAltText: "",
    imageAlignment: "center",
    uploadedImages: [],
    content: "",
    tableData: { headers: [], rows: [] },
    faqSection: [],
    status: "draft",
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
    }
    loadSEOData();
    Category()
    setIsLoading(false);
  }, [router]);

  const loadSEOData = async () => {
    const json = { type: "GET_BLOG_SEO_DETAILS", serviceName: "AdminBlog" };
    const data = await getSeoFromLambda(json);
    if (data.data.body.statuscode == 200) {
      console.log("data", data.data.body.bodymsg);
      setBlogs(data.data.body.bodymsg.image_data);
      setBlogPosts(data.data.body.bodymsg.seo_data ?? []);
    } else {
      setBlogPosts([]);
    }
  };

  const Category = async () => {
    const json = { type: "GET_BLOG_CATEGORIES" };
    const data = await getSeoFromLambda(json);
    if (data?.data?.body?.statuscode === 200) {
      const Data = (data?.data?.body?.bodymsg || [])
        .map((cat) => cat?.category_name?.trim())
        .filter((cat) => cat && cat !== "");
      setCategories(Data);
    }
    else {
      setCategories([]);
    }
  };

  const addCategory = async (categoryName: string) => {
    const json = { type: "ADD_BLOG_CATEGORY", category: categoryName };
    const data = await getSeoFromLambda(json);
    if (data.data.body.statuscode == 200) {
      setBlogs(data.data.body.bodymsg.image_data);
      setBlogPosts(data.data.body.bodymsg.seo_data ?? []);
      Category();
    } else {
      setBlogPosts([]);
    }
  };


  const handleCategoryChange = (e) => {
    if (e.target.value === "add-new") {
      setIsAddingNew(true);
      setFormData({ ...formData, category: "" });
    } else {
      setIsAddingNew(false);
      setFormData({ ...formData, category: e.target.value });
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      setCategories([]);
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory("");
      setIsAddingNew(false);
      addCategory(newCategory.trim());
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
    setIsUploading(true);

    try {
      const uploadedImages: { url: string; name: string; alt: string }[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast({
            title: "Invalid File Type",
            description: `${file.name} is not a valid image file.`,
            variant: "destructive",
          });
          continue;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: `${file.name} is larger than 5MB.`,
            variant: "destructive",
          });
          continue;
        }
        const imageUrl = URL.createObjectURL(file);

        uploadedImages.push({
          url: imageUrl,
          name: file.name,
          alt: `Uploaded image: ${file.name}`,
        });
      }
      const currentImages = formData.uploadedImages || [];
      setFormData({
        ...formData,
        uploadedImages: [...currentImages, ...uploadedImages],
      });

      toast({
        title: "Images Uploaded",
        description: `Successfully uploaded ${uploadedImages.length} image(s).`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeUploadedImage = (index: number) => {
    const currentImages = formData.uploadedImages || [];
    const imageToRemove = currentImages[index];
    if (imageToRemove?.url.startsWith("blob:")) {
      URL.revokeObjectURL(imageToRemove.url);
    }

    const updatedImages = currentImages.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      uploadedImages: updatedImages,
    });
  };

  const updateImageAlt = (index: number, alt: string) => {
    const currentImages = formData.uploadedImages || [];
    const updatedImages = [...currentImages];
    updatedImages[index] = { ...updatedImages[index], alt };
    setFormData({
      ...formData,
      uploadedImages: updatedImages,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (Array.isArray(formData.keywords)) {
      formData.keywords = formData.keywords.filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );
    }

    const requiredFields: (keyof typeof formData)[] = [
      "metaTitle",
      "metaDescription",
      "author",
      "publishDate",
      "location",
      "h1",
      "keywords",
      "content",
      "imageTitle",
      "imageAltText",
    ];
    const emptyFields: string[] = requiredFields.filter((key) => {
      const value = formData[key];
      if (Array.isArray(value)) {
        return (
          value.length === 0 ||
          value.every((item) => {
            if (typeof item === "string") {
              return item.trim() === "";
            }
            if (
              typeof item === "object" &&
              "question" in item &&
              "answer" in item
            ) {
              return (
                !item.question?.toString().trim() ||
                !item.answer?.toString().trim()
              );
            }
            return true;
          })
        );
      }

      return !value?.toString().trim();
    });

    const hasImage =
      (formData.uploadedImages?.length ?? 0) > 0 ||
      !!formData.imageLink?.toString().trim();

    if (!hasImage) {
      emptyFields.push("uploadedImages or imageLink");
    }

    if (emptyFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all fields: ${emptyFields.join(", ")}`,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const newPost: BlogPost = {
      ...(formData as BlogPost),
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    console.log("newPost", newPost);
    setBlogPosts([...blogPosts, newPost]);
    await CallApi({
      ...newPost,
    });
    console.log("newPost.metaTitle", newPost.imageTitle);
    await uploadToS3(newPost.imageTitle);
    toast({
      title: "Blog Post Created",
      description: "New blog post has been created successfully.",
    });
    setIsLoading(false);
  };

  const CallApi = async (seo: BlogPost): Promise<void> => {
    const Json: SeoPayload = {
      type: "INSERT_BLOG_SEO_DETAILS",
      data: seo,
    };
    const result = await saveBlogSeoToLambda(Json);
    console.log("result", result);

    if (result.data.body.statuscode == 200) {
      loadSEOData();
      toast({
        title: "SEO Data Created",
        description: "New SEO configuration has been created successfully.",
      });
      setIsEditing(false);
      setSelectedBlog(null);
      resetForm();
    } else {
      toast({
        title: "Error",
        description: result.data.body.bodymsg,
        variant: "destructive",
      });
    }
  };

  const uploadToS3 = async (Name: any) => {
    if (!file) {
      toast({
        title: "Validation Error",
        description: "Please select a file first",
      });
      return;
    }
    try {
      console.log("Name", Name);
      const presignRes = await axios.post(Lambda_url, {
        type: "GET_URL",
        filename: Name,
        filetype: file.type,
      });
      console.log("presignRes", presignRes.data.body.bodymsg);
      const url = presignRes.data.body.bodymsg;
      console.log("url", url);
      let result = await axios.put(url, file, {
        headers: {
          "Content-Type": file.type,
        },
      });
      console.log("result", result);
      toast({
        title: "Success",
        description: "File Upload successful!",
      });
    } catch (err) {
      console.error("Upload failed:", err);
      toast({
        title: "Error",
        description: "File Upload failed",
      });
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setFormData(blog);
    setIsEditing(true);
  };

  const handleDelete = async (id: string, imageTitle: string) => {
    setIsLoading(true);
    setBlogPosts(blogPosts.filter((post) => post.id !== id));
    const json = {
      type: "DELETE_BLOG_SEO_DETAILS",
      id,
      imagetitle: imageTitle,
    };
    const Res_data = await deleteSeoFromLambda(json);
    console.log("Res_data", Res_data.data.body.statuscode);
    if (Res_data.data.body.statuscode == 200) {
      loadSEOData();
      toast({
        title: "Blog Post Deleted",
        description: "Blog post has been deleted successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: Res_data.data.body.bodymsg,
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    const currentImages = formData.uploadedImages || [];
    currentImages.forEach((image) => {
      if (image.url.startsWith("blob:")) {
        URL.revokeObjectURL(image.url);
      }
    });

    setFormData({
      metaTitle: "",
      metaDescription: "",
      author: "",
      publishDate: "",
      location: "",
      urlSlug: "",
      h1: "",
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      keywords: [],
      category: "",
      subCategory: "",
      imageLink: "",
      imageTitle: "",
      imageAltText: "",
      imageAlignment: "center",
      uploadedImages: [],
      content: "",
      tableData: { headers: [], rows: [] },
      faqSection: [],
      status: "draft",
    });
  };

  const addHeading = (level: string) => {
    const currentHeadings =
      (formData[level as keyof BlogPost] as string[]) || [];
    setFormData({
      ...formData,
      [level]: [...currentHeadings, ""],
    });
  };

  const updateHeading = (level: string, index: number, value: string) => {
    const currentHeadings =
      (formData[level as keyof BlogPost] as string[]) || [];
    const updatedHeadings = [...currentHeadings];
    updatedHeadings[index] = value;
    setFormData({
      ...formData,
      [level]: updatedHeadings,
    });
  };

  const removeHeading = (level: string, index: number) => {
    const currentHeadings =
      (formData[level as keyof BlogPost] as string[]) || [];
    const updatedHeadings = currentHeadings.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [level]: updatedHeadings,
    });
  };

  const addKeyword = () => {
    const keywords = formData.keywords || [];
    setFormData({
      ...formData,
      keywords: [...keywords, ""],
    });
  };

  const updateKeyword = (index: number, value: string) => {
    const keywords = formData.keywords || [];
    const updatedKeywords = [...keywords];
    updatedKeywords[index] = value;
    setFormData({
      ...formData,
      keywords: updatedKeywords,
    });
  };

  const removeKeyword = (index: number) => {
    const keywords = formData.keywords || [];
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      keywords: updatedKeywords,
    });
  };

  const addTableRow = () => {
    const tableData = formData.tableData || { headers: [], rows: [] };
    const newRow = new Array(tableData.headers.length).fill("");
    setFormData({
      ...formData,
      tableData: {
        ...tableData,
        rows: [...tableData.rows, newRow],
      },
    });
  };

  const addTableHeader = () => {
    const tableData = formData.tableData || { headers: [], rows: [] };
    setFormData({
      ...formData,
      tableData: {
        ...tableData,
        headers: [...tableData.headers, ""],
      },
    });
  };

  const updateTableHeader = (index: number, value: string) => {
    const tableData = formData.tableData || { headers: [], rows: [] };
    const updatedHeaders = [...tableData.headers];
    updatedHeaders[index] = value;
    setFormData({
      ...formData,
      tableData: {
        ...tableData,
        headers: updatedHeaders,
      },
    });
  };

  const updateTableCell = (
    rowIndex: number,
    colIndex: number,
    value: string
  ) => {
    const tableData = formData.tableData || { headers: [], rows: [] };
    const updatedRows = [...tableData.rows];
    updatedRows[rowIndex][colIndex] = value;
    setFormData({
      ...formData,
      tableData: {
        ...tableData,
        rows: updatedRows,
      },
    });
  };

  const addFAQ = () => {
    const faqSection = formData.faqSection || [];
    setFormData({
      ...formData,
      faqSection: [...faqSection, { question: "", answer: "" }],
    });
  };

  const updateFAQ = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const faqSection = formData.faqSection || [];
    const updatedFAQ = [...faqSection];
    updatedFAQ[index] = { ...updatedFAQ[index], [field]: value };
    setFormData({
      ...formData,
      faqSection: updatedFAQ,
    });
  };

  const removeFAQ = (index: number) => {
    const faqSection = formData.faqSection || [];
    const updatedFAQ = faqSection.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      faqSection: updatedFAQ,
    });
  };

  const filteredBlogPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.metaTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-hads-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading blog management...</p>
        </div>
      </div>
    );
  }
  if (!isAuthenticated) {
    return null;
  }
  return (
    (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-2">
                Create and manage blog posts with SEO optimization
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Blog List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Blog Posts
                  </CardTitle>
                  <div className="space-y-3">
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hads-purple"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredBlogPosts.map((post) => (
                    <div
                      key={post.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedBlog?.id === post.id
                        ? "border-hads-purple bg-hads-purple/5"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                      onClick={() => {
                        setSelectedBlog(post);
                        setFormData(post);
                        setIsEditing(true);
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {post.metaTitle}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            by {post.author}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant={post.isactive ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {post.isactive ? "Active" : "InActive"}
                            </Badge>
                            {post.category && (
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            <span>{post.publishDate}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(post.id, post.imageTitle);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredBlogPosts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No blog posts found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Blog Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isEditing ? (
                      <Edit className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                    {isEditing ? "Edit Blog Post" : "Create Blog Post"}
                  </CardTitle>
                  <CardDescription>
                    Create engaging blog content with SEO optimization and rich
                    media
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="seo">Headings</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      {/* <TabsTrigger value="table">Table</TabsTrigger>
                      <TabsTrigger value="faq">FAQ</TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="metaTitle">Title</Label>
                          <Input
                            id="metaTitle"
                            value={formData.metaTitle || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metaTitle: e.target.value,
                              })
                            }
                            placeholder="Enter blog title..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="urlSlug">URL Slug</Label>
                          <Input
                            id="urlSlug"
                            value={formData.urlSlug || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                urlSlug: e.target.value,
                              })
                            }
                            placeholder="url-slug"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="author">Author</Label>
                          <Input
                            id="author"
                            value={formData.author || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                author: e.target.value,
                              })
                            }
                            placeholder="Author name..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="publishDate">Publish Date</Label>
                          <Input
                            id="publishDate"
                            type="date"
                            value={formData.publishDate || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                publishDate: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={formData.location || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                location: e.target.value,
                              })
                            }
                            placeholder="City, State"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="metaDescription">
                          Meta Description
                        </Label>
                        <Textarea
                          id="metaDescription"
                          value={formData.metaDescription || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              metaDescription: e.target.value,
                            })
                          }
                          placeholder="Enter meta description..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Keywords</Label>
                        <div className="space-y-2">
                          {(formData.keywords || []).map((keyword, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input
                                value={keyword}
                                onChange={(e) =>
                                  updateKeyword(index, e.target.value)
                                }
                                placeholder="Enter keyword..."
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeKeyword(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addKeyword}
                            className="w-full bg-transparent"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Keyword
                          </Button>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="seo" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="h1">H1 Heading</Label>
                        <Input
                          id="h1"
                          value={formData.h1 || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, h1: e.target.value })
                          }
                          placeholder="Main heading..."
                        />
                      </div>

                      {["h2", "h3", "h4", "h5", "h6"].map((level) => (
                        <div key={level} className="space-y-2">
                          <Label>{level.toUpperCase()} Headings</Label>
                          <div className="space-y-2">
                            {(
                              (formData[level as keyof BlogPost] as string[]) ||
                              []
                            ).map((heading, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2"
                              >
                                <Input
                                  value={heading}
                                  onChange={(e) =>
                                    updateHeading(level, index, e.target.value)
                                  }
                                  placeholder={`Enter ${level.toUpperCase()} heading...`}
                                />
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeHeading(level, index)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => addHeading(level)}
                              className="w-full"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add {level.toUpperCase()} Heading
                            </Button>
                          </div>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="content" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="content">Content</Label>
                        {typeof window !== 'undefined' && (
                          <ReactQuill
                            value={formData.content || ""}
                            onChange={(value) =>
                              setFormData({
                                ...formData,
                                content: value,
                              })
                            }
                            modules={{
                              toolbar: toolbarOptions,
                            }}
                            formats={[
                              "header", "bold", "italic", "underline",
                              "link", "align"
                            ]}
                            placeholder="Write your blog content here..."
                            className="bg-white"
                            style={{ minHeight: "200px" }}
                          />
                        )}
                        <p className="text-sm text-gray-500">
                          You can use Markdown formatting for rich text content.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="basic" className="space-y-4">
                      {/* Image Upload Section */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Upload Images</Label>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                            className="flex items-center gap-2"
                          >
                            {isUploading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-hads-purple border-t-transparent rounded-full animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4" />
                                Upload Images
                              </>
                            )}
                          </Button>
                        </div>

                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />

                        {/* Uploaded Images Gallery */}
                        {(formData.uploadedImages || []).length > 0 && (
                          <>
                            <Label>Uploaded Images</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {(formData.uploadedImages || []).map((image, index) => (
                                <div
                                  key={index}
                                  className="border rounded-lg p-4 space-y-3"
                                >
                                  <div className="relative">
                                    <img
                                      src={
                                        selectedBlog
                                          ? blogs.filter((X) => formData.id === X._id)[0]?.imageUrl
                                          : image.url || "/placeholder.svg"
                                      }
                                      alt={image.alt}
                                      className="w-full h-32 object-cover rounded-md"
                                    />
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      className="absolute top-2 right-2 h-6 w-6 p-0"
                                      onClick={() => removeUploadedImage(index)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <div className="space-y-2">
                                    <p className="text-sm font-medium truncate">{image.name}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Featured Image Section */}
                      <Label>Featured Image</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="imageLink">Image Link</Label>
                          <Input
                            id="imageLink"
                            value={formData.imageLink || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imageLink: e.target.value,
                              })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="category">Category</label>
                          <select
                            id="category"
                            value={formData.category || ""}
                            onChange={handleCategoryChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hads-purple"
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            {categories.map((cat, index) => (
                              <option key={index} value={cat}>
                                {cat}
                              </option>
                            ))}
                            <option value="add-new">➕ Add New Category</option>
                          </select>

                          {isAddingNew && (
                            <div className="flex flex-col sm:flex-row gap-2 mt-2">
                              <input
                                type="text"
                                placeholder="Enter new category"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hads-purple min-w-0"
                              />
                              <button
                                type="button"
                                onClick={handleAddCategory}
                                className="px-4 py-2 bg-hads-purple text-white rounded-md hover:bg-hads-dark transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
                              >
                                Add Category
                              </button>
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="imageTitle">Image Title</Label>
                          <Input
                            id="imageTitle"
                            value={formData.imageTitle || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imageTitle: e.target.value,
                              })
                            }
                            placeholder="Image title..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="imageAltText">Image Alt Text</Label>
                          <Input
                            id="imageAltText"
                            value={formData.imageAltText || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imageAltText: e.target.value,
                              })
                            }
                            placeholder="Image alt text..."
                          />
                        </div>
                      </div>

                      {/* ✅ Moved Featured Image Preview BELOW all form fields */}
                      {formData.imageLink && (
                        <div className="space-y-2 mt-4">
                          <Label>Featured Image Preview</Label>
                          <div
                            className={`flex ${formData.imageAlignment === "center"
                              ? "justify-center"
                              : formData.imageAlignment === "right"
                                ? "justify-end"
                                : "justify-start"
                              }`}
                          >
                            <img
                              src={formData.imageLink || "/placeholder.svg"}
                              alt={formData.imageAltText || "Preview"}
                              title={formData.imageTitle}
                              className="max-w-xs rounded-lg border"
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </TabsContent>



                    <TabsContent value="table" className="space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Table Headers</Label>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addTableHeader}
                            size="sm"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Header
                          </Button>
                        </div>

                        <div className="grid gap-2">
                          {(formData.tableData?.headers || []).map(
                            (header, index) => (
                              <Input
                                key={index}
                                value={header}
                                onChange={(e) =>
                                  updateTableHeader(index, e.target.value)
                                }
                                placeholder={`Header ${index + 1}...`}
                              />
                            )
                          )}
                        </div>

                        {(formData.tableData?.headers || []).length > 0 && (
                          <>
                            <div className="flex items-center justify-between">
                              <Label>Table Rows</Label>
                              <Button
                                type="button"
                                variant="outline"
                                onClick={addTableRow}
                                size="sm"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Row
                              </Button>
                            </div>

                            <div className="space-y-2">
                              {(formData.tableData?.rows || []).map(
                                (row, rowIndex) => (
                                  <div
                                    key={rowIndex}
                                    className="grid gap-2"
                                    style={{
                                      gridTemplateColumns: `repeat(${formData.tableData?.headers.length || 1
                                        }, 1fr)`,
                                    }}
                                  >
                                    {row.map((cell, colIndex) => (
                                      <Input
                                        key={colIndex}
                                        value={cell}
                                        onChange={(e) =>
                                          updateTableCell(
                                            rowIndex,
                                            colIndex,
                                            e.target.value
                                          )
                                        }
                                        placeholder={`Row ${rowIndex + 1
                                          }, Col ${colIndex + 1}`}
                                      />
                                    ))}
                                  </div>
                                )
                              )}
                            </div>

                            {(formData.tableData?.headers || []).length > 0 &&
                              (formData.tableData?.rows || []).length > 0 && (
                                <div className="space-y-2">
                                  <Label>Table Preview</Label>
                                  <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full">
                                      <thead className="bg-gray-50">
                                        <tr>
                                          {formData.tableData?.headers.map(
                                            (header, index) => (
                                              <th
                                                key={index}
                                                className="px-4 py-2 text-left font-medium text-gray-900"
                                              >
                                                {header}
                                              </th>
                                            )
                                          )}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {formData.tableData?.rows.map(
                                          (row, rowIndex) => (
                                            <tr
                                              key={rowIndex}
                                              className="border-t"
                                            >
                                              {row.map((cell, colIndex) => (
                                                <td
                                                  key={colIndex}
                                                  className="px-4 py-2 text-gray-700"
                                                >
                                                  {cell}
                                                </td>
                                              ))}
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="faq" className="space-y-4">
                      <div className="space-y-4">
                        {(formData.faqSection || []).map((faq, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <Label>FAQ {index + 1}</Label>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFAQ(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={faq.question}
                                onChange={(e) =>
                                  updateFAQ(index, "question", e.target.value)
                                }
                                placeholder="Enter question..."
                              />
                              <Textarea
                                value={faq.answer}
                                onChange={(e) =>
                                  updateFAQ(index, "answer", e.target.value)
                                }
                                placeholder="Enter answer..."
                                rows={3}
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addFAQ}
                          className="w-full bg-transparent"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add FAQ
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center gap-3 pt-6 border-t">
                    <Button
                      onClick={handleSave}
                      className="bg-hads-purple hover:bg-hads-purple/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? "Update" : "Create"} Post
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedBlog(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  );
}

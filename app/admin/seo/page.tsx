"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Save,
  Cloud,
  Server,
  GitBranch,
  DollarSign,
  Shield,
  House,
  Eye,
  Handshake,
  CircleUserRound
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  saveSeoToLambda,
  getSeoFromLambda,
  deleteSeoFromLambda,
} from "@/app/api/seoApi";

interface SEOData {
  id: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  h1: string;
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  keywords: string[];
  canonicalTag: string;
  imageAltText: string;
  imageTitle: string;
  contentInsertURL: string;
  faqSection: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
  type: string;
  isactive: boolean;
}
type SeoPayload = {
  type: string;
  data: SEOData;
};
const serviceScreens = [
  {
    id: "cloud-migration",
    name: "Cloud Migration",
    icon: Cloud,
    color: "text-sky-600", 
  },
  {
    id: "managed-services",
    name: "Managed Services",
    icon: Server,
    color: "text-emerald-600", 
  },
  {
    id: "devops-automation",
    name: "DevOps Automation",
    icon: GitBranch,
    color: "text-indigo-600", 
  },
  {
    id: "finops",
    name: "FinOps",
    icon: DollarSign,
    color: "text-amber-600",
  },
  {
    id: "security-compliance",
    name: "Security & Compliance",
    icon: Shield,
    color: "text-rose-600",
  },
  {
    id: "contact",
    name: "Contact",
    icon: CircleUserRound,
    color: "text-cyan-600", 
  },
  {
    id: "partners",
    name: "Partners",
    icon: Handshake,
    color: "text-lime-600",
  },
  {
    id: "about",
    name: "About",
    icon: Eye,
    color: "text-fuchsia-600",
  },
  {
    id: "home",
    name: "Home",
    icon: House,
    color: "text-violet-600",
  },
];


export default function SEOManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [seoData, setSeoData] = useState<SEOData[]>([]);
  const [selectedSEO, setSelectedSEO] = useState<SEOData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] =
    useState<string>("cloud-migration");


  const [formData, setFormData] = useState<Partial<SEOData>>({
    serviceName: "",
    metaTitle: "",
    metaDescription: "",
    urlSlug: "",
    h1: "",
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    keywords: [],
    canonicalTag: "",
    imageAltText: "",
    imageTitle: "",
    contentInsertURL: "",
    faqSection: [],
  });

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      loadSEOData();
    }
    setIsLoading(false);
  }, [router]);

  const loadSEOData = async () => {
    const json = { type: "GET_SEO_DETAILS" };
    const data = await getSeoFromLambda(json);
    if (data.data.body.statuscode == 200) {
      console.log("data..........", data.data.body.bodymsg);
      setSeoData(
        data.data.body.bodymsg == "No Data Found" ? [] : data.data.body.bodymsg
      );
    } else {
      setSeoData([]);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (Array.isArray(formData.keywords)) {
      formData.keywords = formData.keywords.filter(
        (item) => typeof item === "string" && item.trim() !== ""
      );
    }
    const requiredFields: (keyof typeof formData)[] = [
      "h1",
      "keywords",
      "metaDescription",
      "metaTitle",
    ];

    const emptyFields = requiredFields.filter((key) => {
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

    if (emptyFields.length > 0) {
      toast({
        title: "Validation Error",
        description: `Please fill in all fields: ${emptyFields.join(", ")}`,
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (isEditing && selectedSEO) {
      // Update existing SEO data
      console.log("seoDatain editt", seoData);

      const updatedData = seoData.map((item) =>
        item.id === selectedSEO.id
          ? {
            ...item,
            ...formData,
            updatedAt: new Date().toISOString().split("T")[0],
          }
          : item
      );
      let filteredData = seoData.filter((item) => item.id === selectedSEO.id);
      let finaldata = { ...filteredData, ...formData };
      console.log("finaldata in edit", finaldata);

      console.log("updatedData in edit", updatedData);

      console.log("filteredData", filteredData);

      setSeoData(updatedData);
      const json = { ...finaldata, type: "Edit_Seo_Details" };
      const Res_data = await deleteSeoFromLambda(json);

      console.log("Res_data", Res_data.data.body.statuscode);
      if (Res_data.data.body.statuscode == 200) {
        loadSEOData();
        toast({
          title: "SEO Data Updated",
          description: "SEO settings have been successfully updated.",
        });
        setIsEditing(false);
        setSelectedSEO(null);
        resetForm();
      }
    } else {
      const selectedServiceData = serviceScreens.find(
        (s) => s.id === selectedService
      );
      const newSEO: SEOData = {
        id: Date.now().toString(),
        serviceName: selectedServiceData?.name || "",
        ...(formData as Omit<
          SEOData,
          "id" | "serviceName" | "createdAt" | "updatedAt"
        >),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };
      setSeoData([...seoData, newSEO]);
      await CallApi({
        ...newSEO,
        serviceName: selectedService,
      });
    }
    setIsLoading(false);
  };

  const CallApi = async (seo: SEOData): Promise<void> => {
    const Json: SeoPayload = {
      type: "INSERT_SEO_DETAILS",
      data: seo,
    };

    const result = await saveSeoToLambda(Json);
    console.log("result", result);

    if (result.data.body.statuscode == 200) {
      loadSEOData();
      toast({
        title: "SEO Data Created",
        description: "New SEO configuration has been created successfully.",
      });
      setIsEditing(false);
      setSelectedSEO(null);
      resetForm();
    } else {
      toast({
        title: "Error",
        description: result.data.body.bodymsg,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (seo: SEOData) => {
    setSelectedSEO(seo);
    setFormData(seo);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    setIsLoading(true);
    setSeoData(seoData?.filter((item) => item.id !== id));
    let seoid = seoData?.filter((item) => item.id == id);
    const json = { ...seoid[0], type: "DELETE_SEO_DETAILS" };
    const Res_data = await deleteSeoFromLambda(json);

    console.log("Res_data", Res_data.data.body.statuscode);
    if (Res_data.data.body.statuscode == 200) {
      loadSEOData();
      toast({
        title: "SEO Data Deleted",
        description: "SEO configuration has been deleted successfully.",
      });
    }
    if (selectedSEO?.id === id) {
      setSelectedSEO(null);
      resetForm();
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    const selectedServiceData = serviceScreens.find(
      (s) => s.id === selectedService
    );
    setFormData({
      serviceName: selectedServiceData?.name || "",
      metaTitle: "",
      metaDescription: "",
      urlSlug: "",
      h1: "",
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
      keywords: [],
      canonicalTag: "",
      imageAltText: "",
      imageTitle: "",
      contentInsertURL: "",
      faqSection: [],
    });
  };

  const handleAddNewConfig = () => {
    setIsEditing(false);
    setSelectedSEO(null);
    resetForm();
  };

  const handleServiceChange = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedSEO(null);
    setIsEditing(false);
    resetForm();
  };

  const addHeading = (level: string) => {
    const currentHeadings =
      (formData[level as keyof SEOData] as string[]) || [];
    setFormData({
      ...formData,
      [level]: [...currentHeadings, ""],
    });
  };

  const updateHeading = (level: string, index: number, value: string) => {
    const currentHeadings =
      (formData[level as keyof SEOData] as string[]) || [];
    const updatedHeadings = [...currentHeadings];
    updatedHeadings[index] = value;
    setFormData({
      ...formData,
      [level]: updatedHeadings,
    });
  };

  const removeHeading = (level: string, index: number) => {
    const currentHeadings =
      (formData[level as keyof SEOData] as string[]) || [];
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
  const filteredSEOData = seoData.filter(
    (item) =>
      item.serviceName ==
      serviceScreens.find((s) => s.id === selectedService)?.id
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-hads-purple border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SEO management...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    console.log("return seodata", seoData),
    console.log("filteredSEOData", filteredSEOData),
    (
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                SEO Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage meta tags, headings, and SEO optimization settings for
                all services
              </p>
            </div>
          </div>

          {/* Service Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 p-1">
            <div className="flex flex-wrap gap-1">
              {serviceScreens.map((service) => {
                const IconComponent = service.icon;
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceChange(service.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${selectedService === service.id
                      ? "bg-hads-purple text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                  >
                    <IconComponent
                      className={`h-4 w-4 ${selectedService === service.id
                        ? "text-white"
                        : service.color
                        }`}
                    />
                    {service.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SEO List */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Search className="h-5 w-5 flex-shrink-0" />
                    <span className="truncate">SEO Configurations</span>
                  </CardTitle>
                  <div className="text-sm text-gray-500 mb-3">
                    {serviceScreens.find((s) => s.id === selectedService)?.name}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search SEO configs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredSEOData.map((seo) => (
                    <div
                      key={seo.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${selectedSEO?.id === seo.id
                        ? "border-hads-purple bg-hads-purple/5"
                        : "border-gray-200 hover:border-gray-300"
                        }`}
                      onClick={() => {
                        setSelectedSEO(seo);
                        setFormData(seo);
                        setIsEditing(false);
                      }}
                    >
                      <div className="items-start justify-between mb-5">
                        <Badge
                          variant={seo.isactive ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {seo.isactive ? "Active" : "InActive"}
                        </Badge>
                      </div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3
                            className="font-medium text-gray-900 text-sm truncate"
                            title={seo.metaTitle}
                          >
                            {seo.metaTitle}
                          </h3>
                          <p
                            className="text-xs text-gray-500 mt-1 truncate"
                            title={`/${seo.urlSlug}`}
                          >
                            /{seo.urlSlug}
                          </p>
                          <div className="flex items-center gap-1 mt-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              {seo.keywords.length} keywords
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              {seo.faqSection.length} FAQs
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 flex-shrink-0">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(seo);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(seo.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSEOData.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No SEO configurations found</p>
                      <p className="text-xs mt-1">
                        for{" "}
                        {
                          serviceScreens.find((s) => s.id === selectedService)
                            ?.name
                        }
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* SEO Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {isEditing ? (
                      <Edit className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                    {isEditing
                      ? "Edit SEO Configuration"
                      : "Create SEO Configuration"}
                  </CardTitle>
                  <CardDescription>
                    Configure meta tags, headings, and SEO settings for{" "}
                    {serviceScreens.find((s) => s.id === selectedService)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                      <TabsTrigger value="headings">Headings</TabsTrigger>
                      {/* <TabsTrigger value="media">Media & Links</TabsTrigger> */}
                      {/* <TabsTrigger value="faq">FAQ Section</TabsTrigger> */}
                    </TabsList>

                    <TabsContent value="basic" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input
                          id="serviceName"
                          value={
                            serviceScreens.find((s) => s.id === selectedService)
                              ?.name || ""
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              serviceName: e.target.value,
                            })
                          }
                          placeholder="Service name..."
                          disabled
                          className="bg-gray-50"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="metaTitle">Meta Title</Label>
                          <Input
                            id="metaTitle"
                            value={formData.metaTitle || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                metaTitle: e.target.value,
                              })
                            }
                            placeholder="Enter meta title..."
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
                        <Label htmlFor="canonicalTag">Canonical Tag</Label>
                        <Input
                          id="canonicalTag"
                          value={formData.canonicalTag || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              canonicalTag: e.target.value,
                            })
                          }
                          placeholder="https://example.com/page"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contentInsertURL">
                          Content Insert URL
                        </Label>
                        <Input
                          id="contentInsertURL"
                          value={formData.contentInsertURL || ""}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              contentInsertURL: e.target.value,
                            })
                          }
                          placeholder="/page-url"
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

                    <TabsContent value="headings" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="h1">H1 Heading</Label>
                        <Input
                          id="h1"
                          value={formData.h1 || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, h1: e.target.value })
                          }
                          placeholder="Main page heading..."
                        />
                      </div>

                      {["h2", "h3", "h4", "h5", "h6"].map((level) => (
                        <div key={level} className="space-y-2">
                          <Label>{level.toUpperCase()} Headings</Label>
                          <div className="space-y-2">
                            {(
                              (formData[level as keyof SEOData] as string[]) ||
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

                    {/* <TabsContent value="media" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    </TabsContent> */}

                    <TabsContent value="faq" className="space-y-4">
                      <div className="space-y-4">
                        {(formData.faqSection || []).map((faq, index) => (
                          <div
                            key={index}
                            className="p-4 border rounded-lg space-y-3"
                          >
                            {/* <div className="flex items-center justify-between">
                              <Label>FAQ {index + 1}</Label>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFAQ(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div> */}
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
                        {/* <Button
                          type="button"
                          variant="outline"
                          onClick={addFAQ}
                          className="w-full bg-transparent"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add FAQ
                        </Button> */}
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center gap-3 pt-6 border-t">
                    <Button
                      disabled={selectedSEO ? isEditing != true && true : false}
                      onClick={handleSave}
                      className="bg-hads-purple hover:bg-hads-purple/90"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      {isEditing ? "Update" : "Create"} SEO Config
                    </Button>
                    <Button variant="outline" onClick={handleAddNewConfig}>
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

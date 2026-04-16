import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    //this is for checking whether the company name is provided or not
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    //this is for checking whether the company is already registered or not
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "You can not register same company.",
        success: false,
      });
    }

    //this is for creating a new company
    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id; // only shows the companies created by that user
    const companies = await Company.find({ userId });
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No company found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Companies fetched successfully.",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

//get comapany by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "No company found.",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
//update company information
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({});
    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "All companies fetched successfully.",
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateCompany = async (req, res) => {
  try {
    //add those data which has to be updated
    const { name, description, website, location } = req.body;
    const file = req.file;
    
    //a variable to store the updated data
    const updateData = { name, description, website, location };
    
    //cloudinary - only process if file is provided
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      const logo = cloudResponse.secure_url;
      updateData.logo = logo;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "No company found.",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company updated successfully.",
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

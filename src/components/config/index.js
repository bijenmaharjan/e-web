export const formControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description ",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    type: "text",
    options: [
      {
        id: "men",
        label: "Men",
      },
      {
        id: "women",
        label: "Women",
      },
      {
        id: "kids",
        label: "Kids",
      },
      {
        id: "accessories",
        label: "Accessories",
      },
      {
        id: "footwear",
        label: "Footwear",
      },
      {
        id: "known",
        label: "--",
      },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    type: "text",
    options: [
      {
        id: "nike",
        label: "Nike",
      },
      {
        id: "adidas",
        label: "Adidas",
      },
      {
        id: "puma",
        label: "Puma",
      },
      {
        id: "levi",
        label: "Levi's",
      },
      {
        id: "zara",
        label: "Zara",
      },
      {
        id: "h&m",
        label: "H&M",
      },
      {
        id: "known",
        label: "--",
      },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
  {
    label: "Size",
    name: "size",
    componentType: "checkbox",
    type: "checkbox",
    options: [
      {
        id: "XS",
        label: "XS",
      },
      {
        id: "S",
        label: "S",
      },
      {
        id: "M",
        label: "M",
      },
      {
        id: "L",
        label: "L",
      },
      {
        id: "XL",
        label: "XL",
      },
      {
        id: "2XL",
        label: "2XL",
      },
      {
        id: "3XL",
        label: "3XL",
      },
    ],
  },
];

export const productSize = [];

export const shoppingMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const filterOptions = {
  category: [
    {
      id: "men",
      label: "Men",
    },
    {
      id: "women",
      label: "Women",
    },
    {
      id: "kids",
      label: "Kids",
    },
    {
      id: "accessories",
      label: "Accessories",
    },
    {
      id: "footwear",
      label: "Footwear",
    },
  ],
  brand: [
    {
      id: "nike",
      label: "Nike",
    },
    {
      id: "adidas",
      label: "Adidas",
    },
    {
      id: "puma",
      label: "Puma",
    },
    {
      id: "levi",
      label: "Levi's",
    },
    {
      id: "zara",
      label: "Zara",
    },
    {
      id: "h&m",
      label: "H&M",
    },
  ],
};

export const sortOptions = [
  {
    id: "price-lowtohigh",
    label: "Price: Low to High",
  },
  {
    id: "price-hightolow",
    label: "Price: High to Low",
  },
  {
    id: "title-atoz",
    label: "Price: Title A to Z",
  },
  {
    id: "title-ztoa",
    label: "Title Z to A",
  },
];

export const categoryMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

export const brandMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  "levi's": "Levi's",
  zara: "Zara",
  "h&m": "H&M",
};

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];



export const contractAddress = "0x9Cd064e6f94eb160FAE95C1ec3C9e83FCBBe7474";

export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "image",
        type: "string",
      },
    ],
    name: "CampaignCreation",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Donation",
    type: "event",
  },
  {
    inputs: [],
    name: "campaignCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "campaigns",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "creator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "target",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountCollected",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "image",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_deadline",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_target",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_image",
        type: "string",
      },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "donateToCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCampaigns",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "target",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountCollected",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "image",
            type: "string",
          },
          {
            internalType: "uint256[]",
            name: "donations",
            type: "uint256[]",
          },
          {
            internalType: "address[]",
            name: "donators",
            type: "address[]",
          },
        ],
        internalType: "struct CrowdFunding.Campaign[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getDonators",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract CrowdFunding {
    struct Campaign {
        string title;
        string description;
        address creator;
        uint256 deadline;
        uint256 target;
        uint256 amountCollected;
        string image;
        uint256[] donations;
        address[] donators;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreation(
        string title,
        string description,
        address creator,
        uint256 deadline,
        uint256 target,
        string image
    );
    event Donation(uint256 id, uint256 amount);

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _deadline,
        uint256 _target,
        string memory _image
    ) public {
        campaignCount++;
        Campaign storage campaign = campaigns[campaignCount];
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        campaign.title = _title;
        campaign.description = _description;
        campaign.creator = msg.sender;
        campaign.deadline = _deadline;
        campaign.target = _target;
        campaign.amountCollected = 0;
        campaign.image = _image;
        campaign.donations = new uint256[](0);
        campaign.donators = new address[](0);

        emit CampaignCreation(
            _title,
            _description,
            msg.sender,
            _deadline,
            _target,
            _image
        );
    }

    function donateToCampaign(uint256 _id) public payable {
        Campaign storage _campaign = campaigns[_id];
        require(msg.value > 0, "Pay more than 0");

        _campaign.donators.push(msg.sender);
        _campaign.donations.push(msg.value);

        (bool sent, ) = payable(_campaign.creator).call{value: msg.value}("");

        if (sent) {
            _campaign.amountCollected += msg.value;
        }
        emit Donation(_id, msg.value);
    }

    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaign = new Campaign[](campaignCount);

        for (uint256 i = 0; i < campaignCount; i++) {
            Campaign storage item = campaigns[i + 1];

            allCampaign[i] = item;
        }
        return allCampaign;
    }
}

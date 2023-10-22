jsonData= {
  "data": {
    "Socials": {
      "Social": [
        {
          "profileName": "kanlanc.lens",
          "profileBio": "",
          "dappName": "lens",
          "followings": {
            "Following": [
              {
                "followingProfileId": "64",
                "followingAddress": {
                  "socials": [
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "tamrat.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x8f96aa1c4cbd3b10786c81031c6917bcac66423c"
                      ]
                    }
                  ]
                }
              },
              {
                "followingProfileId": "16",
                "followingAddress": {
                  "socials": [
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "anddao.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x88a769db5055b046c9a45db621978bbec65c8c5b"
                      ]
                    },
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "damarnez.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x88a769db5055b046c9a45db621978bbec65c8c5b"
                      ]
                    }
                  ]
                }
              },
              {
                "followingProfileId": "5",
                "followingAddress": {
                  "socials": [
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "stani.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
                      ]
                    },
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "lilgho.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
                      ]
                    },
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "lensofficial.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x7241dddec3a6af367882eaf9651b87e1c7549dff"
                      ]
                    }
                  ]
                }
              },
              {
                "followingProfileId": "172",
                "followingAddress": {
                  "socials": [
                    {
                      "profileBio": "",
                      "dappName": "lens",
                      "profileName": "dydymoon.lens",
                      "userAddress": "",
                      "userAssociatedAddresses": [
                        "0x806346b423ddb4727c1f5dc718886430aa7ce9cf"
                      ]
                    }
                  ]
                }
              }
            ]
          },
          "followers": {
            "Follower": None
          }
        }
      ]
    }
  }
}

flattened_data = []

for social in jsonData['data']['Socials']['Social']:
    for following in social['followings']['Following']:
        for social_detail in following['followingAddress']['socials']:
            name = social_detail.get('profileName', '')
            walletAddress = ', '.join(social_detail.get('userAssociatedAddresses', []))
            profileBio = social_detail.get('profileBio', '')
            if profileBio:  # Only add if profileBio is not empty
                flattened_data.append({
                    'name': name,
                    'walletAddress': walletAddress,
                    'profileBio': profileBio
                })


print(flattened_data)
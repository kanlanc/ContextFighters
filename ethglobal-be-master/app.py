from flask import Flask, jsonify, request
import asyncio
from airstack.execute_query import AirstackClient
import json
from flask_cors import CORS, cross_origin
from useful_connections import main_function

app = Flask(__name__)
# cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

CORS(app, resources={r"/*": {"origins": "*"}})


api_key = "1f928d8e9e224eb3bc7a6bb474b208cf"
DB_FILE = "user_data1.json"
# def load_user_data():
#     try:
#         with open(json_file_path, 'r') as file:
#             return json.loads(file)
#     except FileNotFoundError:
#         # If the file doesn't exist, return an empty dictionary
#         return {}
matched_to=[] 
def load_user_data():
    try:
        with open(DB_FILE, "r") as file:
            # Read the contents of the file as a JSON string
            user_data_json = file.read()

            # Parse the JSON string into a Python dictionary
            user_data = json.loads(user_data_json)

            return user_data
    except FileNotFoundError:
        # If the file doesn't exist, return an empty dictionary
        return {}


# Helper function to save user data to the JSON file
def save_user_data(data):
    with open(DB_FILE, "w") as file:
        json.dump(data, file, indent=4)


@app.route("/")
def home():
    return "Welcome to our SocialConnect app!!!!!!"

@app.route("/find/matches", methods=["POST", "OPTIONS"])
@cross_origin(origin="*")
def add_user():
    try:
        # Parse the JSON data from the request body
        request_data = request.get_json()
        print(request_data)

        # Extract data from the JSON
        wallet_address = request_data.get("wallet_address")
        xmtp_enabled = request_data.get("xmtp_enabled")
        query = request_data.get("query")
        api_key = '1f928d8e9e224eb3bc7a6bb474b208cf'
        api_client = AirstackClient(api_key=api_key)

        
        query_boolean = """
        query MyQuery($identity: Identity) {
        Socials
        (
          input: {filter: {identity: {_eq: $identity}}, blockchain: ethereum}
        ) {
        Social {
          profileName
          profileBio
          dappName
          followings(input: {filter: {dappName: {_eq: lens}}}) {
            Following {
              followingProfileId
              followingAddress {
                socials(input: {filter: {dappName: {_eq: lens}}}) {
                  profileBio
                  dappName
                  profileName
                  userAddress
                  userAssociatedAddresses
                }
              }
            }
          }
          followers(input: {filter: {dappName: {_eq: lens}}}) {
            Follower {
              followerProfileId
              followerAddress {
                socials(input: {filter: {dappName: {_eq: lens}}}) {
                  profileBio
                  dappName
                  profileName
                  userAddress
                  userAssociatedAddresses
                }
              }
            }
          }
        }
      }
    }
        
        """

        variables = {
          "identity": username
        }

        execute_query_client = api_client.create_execute_query_object(query=query_boolean, variables=variables)
        query_response = await execute_query_client.execute_paginated_query()

        data = json.dumps(query_response.data)

        data=str(data)
        response_data = json.loads(data)

        flattened_data = [
          {
              "name": social["profileName"],
              "walletAddress": address,
              "profileBio": social["profileBio"]
          }
          for social in response_data["data"]["Socials"]["Social"]
          for following in social["followings"]["Following"]
          for address in following["followingAddress"]["socials"][0]["userAssociatedAddresses"]
          if social["profileBio"]
      ]

        # Now send this to openAI

        df = pd.DataFrame(flattened_data)
        result = main_function(user_query=user_query, user_connections_list=df)

        return jsonify({"data": result, "error": query_response.error})

        except Exception as e:
            return jsonify({"error": str(e)})




@app.route('/match/<username>', methods=['GET'])
async def match(username):
    api_key = '1f928d8e9e224eb3bc7a6bb474b208cf'
    api_client = AirstackClient(api_key=api_key)

    
    query_boolean = """
    query MyQuery($identity: Identity) {
    Socials
    (
      input: {filter: {identity: {_eq: $identity}}, blockchain: ethereum}
    ) {
    Social {
      profileName
      profileBio
      dappName
      followings(input: {filter: {dappName: {_eq: lens}}}) {
        Following {
          followingProfileId
          followingAddress {
            socials(input: {filter: {dappName: {_eq: lens}}}) {
              profileBio
              dappName
              profileName
              userAddress
              userAssociatedAddresses
            }
          }
        }
      }
      followers(input: {filter: {dappName: {_eq: lens}}}) {
        Follower {
          followerProfileId
          followerAddress {
            socials(input: {filter: {dappName: {_eq: lens}}}) {
              profileBio
              dappName
              profileName
              userAddress
              userAssociatedAddresses
            }
          }
        }
      }
    }
  }
}
    
    """

    variables = {
      "identity": username
    }

    execute_query_client = api_client.create_execute_query_object(query=query_boolean, variables=variables)
    query_response = await execute_query_client.execute_paginated_query()

    data = json.dumps(query_response.data)

    data=str(data)
    response_data = json.loads(data)

    flattened_data = [
      {
          "name": social["profileName"],
          "walletAddress": address,
          "profileBio": social["profileBio"]
      }
      for social in response_data["data"]["Socials"]["Social"]
      for following in social["followings"]["Following"]
      for address in following["followingAddress"]["socials"][0]["userAssociatedAddresses"]
      if social["profileBio"]
  ]

    # Now send this to openAI

    df = pd.read_csv("app/enriched_linkedin_data_connections.csv")
    result = main_function(user_query=user_query, user_connections_list=df)

    # return jsonify({"data": json.dumps(simplified_data, indent=2), "error": query_response.error})
    # return jsonify({"data": res[0], "error": query_response.error})





        

        



@app.route('/v1/match/<username>', methods=['GET'])
async def match1(username):
    api_key = '1f928d8e9e224eb3bc7a6bb474b208cf'
    api_client = AirstackClient(api_key=api_key)

    matched_to=["henri.lens",
    "pussyriotxyz.lens",
    "marenaltman.lens",
    "salti.lens",
    "rachb.lens",
    "mylene.lens",
    "salti.lens"
    "gregcardo.lens",
    "edwardtay.lens",
    "polmaire.lens",
    "larryscruff.lens"
    ]

    query_boolean = """query MyQuery($username2: Identity) {
      TokenBalances(
        input: {filter: {owner: {_eq: "salti.lens"}, tokenType: {_eq: ERC20}}, blockchain: polygon}
      ) {
        TokenBalance {
          token {
            tokenBalances(
              input: {filter: {owner: {_eq: $username2}, tokenType: {_eq: ERC20}}}
            ) {
              id
              token {
                address
                symbol
                name
                owner {
                  identity
                }
              }
            }
          }
          owner {
            blockchain
          }
        }
      }
    }"""
    res = []
    for i in matched_to:
        # print(i)
        variables = {
    "username2": i
    }
        
        execute_query_client = api_client.create_execute_query_object(
        query=query_boolean, variables=variables)
        query_response = await execute_query_client.execute_paginated_query()

        data = json.dumps(query_response.data)

        data=str(data)
        response_data = json.loads(data)
        

        # Access the "identity" field
        identity = None  # Default value if not found
        try:
            # new_data = json.loads(response_data["data"])
            token_balance_list = response_data.get("TokenBalances", {}).get("TokenBalance", [])
            for item in token_balance_list:
                token = item.get("token", {})
                tokenbal = token.get("tokenBalances")
                if isinstance(tokenbal, list) and not isinstance(tokenbal, dict) and tokenbal:
                    inner = tokenbal[0]['token']['owner']
                    if inner and inner['identity']:
                        identity = inner['identity']
                        res.append(identity)
                
                if identity:
                    break  # Stop when identity is found
        except (KeyError, json.JSONDecodeError):
            pass

    return jsonify({"data": res[0], "error": query_response.error})
        
user_data = {}


@app.route("/users/new", methods=["POST", "OPTIONS"])
@cross_origin(origin="*")
def add_user():
    try:
        # Parse the JSON data from the request body
        request_data = request.get_json()
        print(request_data)

        # Extract data from the JSON
        wallet_address = request_data.get("wallet_address")
        xmtp_enabled = request_data.get("xmtp_enabled")
        bio = request_data.get("bio")
        preferences = request_data.get("preferences")
        category = request_data.get("category")

        # Create a user object with the extracted data
        user = {
            "wallet_address": wallet_address,
            "xmtp_enabled": xmtp_enabled,
            "bio": bio,
            "preferences": preferences,
            "category": category,
        }

        user_data = load_user_data()

        # Generate a unique user ID (for demonstration purposes)
        user_id = wallet_address

        # Store the user object in the user_data dictionary
        user_data[user_id] = user

        save_user_data(user_data)

        return jsonify({"message": f"User added with ID {user_id}."})

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/user/<wallet_address>", methods=["GET", "OPTIONS", "POST"])
def get_user(wallet_address):
    try:
        # Find the user with the specified wallet address
        user_data = load_user_data()

        if wallet_address in user_data:
            user = user_data[wallet_address]
            return jsonify(user)
        else:
            return (
                jsonify(
                    {"error": f"No user found with wallet address {wallet_address}."}
                ),
                404,
            )

    except Exception as e:
        return jsonify({"error": str(e)})


@app.route("/checkXMTPEnabled/<address>", methods=["GET"])
async def checkXMTP(address):
    api_key = "1f928d8e9e224eb3bc7a6bb474b208cf"
    api_client = AirstackClient(api_key=api_key)

    query_boolean = """query MyQuery($address: Identity ) {
    XMTPs(input: {blockchain: ALL, filter: {owner: {_eq: $address}}}) {
    XMTP {
        isXMTPEnabled
    }
    }
    }"""

    variables = {"address": address}

    execute_query_client = api_client.create_execute_query_object(
        query=query_boolean, variables=variables
    )
    query_response = await execute_query_client.execute_paginated_query()

    if query_response.has_next_page:
        next_page_response = await query_response.get_next_page

    # if next_page_response.has_prev_page:
    #     prev_page_response = await next_page_response.get_prev_page

    data = json.dumps(query_response.data)
    print(data)
    return jsonify({"data": data, "error": query_response.error})


@app.route("/checkXMTPLens/<address>", methods=["GET"])
async def checkXMTPLens(address):
    api_key = "1f928d8e9e224eb3bc7a6bb474b208cf"
    api_client = AirstackClient(api_key=api_key)

    query_boolean = """query MyQuery($address: Identity) {
  Socials(
    input: {filter: {identity: {_eq: $address}, dappSlug: {_eq: lens_polygon}}, blockchain: ethereum}
  ) {
    Social {
      dappName
      dappSlug
      profileName
    }
  }
}"""

    variables = {"address": address}

    execute_query_client = api_client.create_execute_query_object(
        query=query_boolean, variables=variables
    )
    query_response = await execute_query_client.execute_paginated_query()
    print(query_response)

    # if next_page_response.has_prev_page:
    #     prev_page_response = await next_page_response.get_prev_page

    data = json.dumps(query_response.data)
    print(data)
    return jsonify({"data": data, "error": query_response.error})


@app.route("/getXMTPenabledAddresses", methods=["GET"])
async def execute_query():
    api_key = "1f928d8e9e224eb3bc7a6bb474b208cf"
    api_client = AirstackClient(api_key=api_key)

    queryBulk = """query BulkFetchPrimaryENSandXMTP($address: [Identity!]) {
      XMTPs(input: {blockchain: ALL, filter: {owner: {_in: $address}}}) {
        XMTP {
          isXMTPEnabled
          owner {
            addresses
            primaryDomain {
              name
            }
          }
        }
      }
    }"""

    variables = {
        "address": [
            "0x2F60D2BB84Eb8df6951F7215ef035eF052BA2725",
            "0xB0CCf43adA6CBaA26dcf4907117b496d49f74242",
            "0xD1EAeFBeFFD4106A1A166CD26a1Fe23140D6a42e",
            "0x07e522bd635710e752343387b006BB7047663d77",
            "0x952580D41f10dB41d97fcd6B1984bC2538eEFC2c",
            "0x44Dfdb5d9E035ebe5793a5060e5bc23514853932",
            "0xA8C7372dC993d7510C9c45425807d463967cbb12",
            "0xfF51cc1519c7a61144d3FF6F883122f150752445",
            "0xDf440C14103AF0E3F4293BfdD8b21754E02d1bAD",
            "0x201BE631a06CC2922532acc00Fe39Da0f87c8985",
            "0x7aa96bFCa841B8FC3879c17555330CBDBbCAD3e8",
            "0x05FF7cC8B490B38898744037f951F3247673C2ed",
            "0xd5482b2f9EdF93A79d6D60f5903Be35D8622662E",
            "0x74B78e98093F5B522A7eBDAc3B994641cA7c2b20",
            "0x246c10ED2d810634D5D5D6f3d52F4d90D3717e17",
            "0x5A927Ac639636E534b678e81768CA19e2C6280B7",
            "0xf9a3BB070c1f9b3186A547DeD991BeD04a289C5B",
            "0x88F667664E61221160ddc0414868eF2f40e83324",
            "0x8dB916FadB1C973D610346F0a1a8e4C81acF0390",
            "0x72A69e7dAb96e415A42b4fa841DbAA899Ab780F6",
            "0xD7029BDEa1c17493893AAfE29AAD69EF892B8ff2",
            "0x2AC521461b8127438E8B4A2C6F7330CaA0890c1C",
            "0x0A5BffC28ca3A0802faFBF6885473f4E5b45F693",
            "0xe3D73DAaE939518c3853e0E8e532ae707cC1A436",
            "0xF417ACe7b13c0ef4fcb5548390a450A4B75D3eB3",
            "0x3a4e6eD8B0F02BFBfaA3C6506Af2DB939eA5798c",
            "0xa75b7833c78EBA62F1C5389f811ef3A7364D44DE",
            "0x34C3A5ea06a3A67229fb21a7043243B0eB3e853f",
            "0xb7F296FE3B08Da98D224fbb663d3fa25150A8EEA",
            "0x0B7a1e683bB5C882722Ef2F332288a10CDA30A95",
            "0xbA625bb4b560C8ED72A2b085B3fcF7b008cFfeb0",
            "0x332777864cCe8879Efe2356De27946B643BE38D0",
            "0x534631Bcf33BDb069fB20A93d2fdb9e4D4dD42CF",
            "0xD72DF24a344a0e78158a4A953174Eba25d339D94",
            "0x4cabe29909E1B94f52560799629481D570F311cF",
            "0xd61daEBC28274d1feaAf51F11179cd264e4105fB",
            "0xdAa83039ACA9a33b2e54bb2acC9f9c3A99357618",
            "0x621b35b50c508f3497437Ae777dEe70D052D6AD9",
            "0xd26b76e50f6510cdD4bf45d59279705f36946d23",
            "0x186Ea56F0a40c5593A697B3E804968b8C5920Ff3",
            "0xA64fc17B157aaA50AC9a8341BAb72D4647d0f1A7",
            "0xf3B06b503652a5E075D423F97056DFde0C4b066F",
            "0x471e9B5f89F827045E6d9Ec2083A310C27459157",
            "0x2Cb5Ae51861A4a6E8568b527cAFC3891317Ac94d",
            "0x294AF33e5590725f684De80d88E72009b1AB6F76",
            "0x538527f3602acaD78596F17B422Fcf5613Af1409",
            "0xDC40CbF86727093c52582405703e5b97D5C64B66",
            "0x4303Ddc9943D862f2B205aF468a4A786c5137E76",
            "0x869139316d79117003D69bD41DEaeCA22eA6cE18",
            "0x7e37C3A9349227B60503DDB1574A76d10C6bc48E",
            "0x9EAB9D856a3a667dc4CD10001D59c679C64756E7",
            "0xcB7eA0eC36670AA13088C4372fe8636D4D2b574f",
            "0xC4E04f274066c06261b0cb83d0AB9304A90C3D82",
            "0x4496848684441C15A915fa9bF07D131155603253",
            "0x2376e9C7C604D1827bA9aCb1293Dc8b4DA2f0DB3",
            "0x09dE8dE37fD4BEfE77a45EDa7E794A2bEbBDC1B7",
            "0xD30F2888E7928b52EA5bF4cb1D323e0531aFe272",
            "0x68d36DcBDD7Bbf206e27134F28103abE7cf972df",
            "0x96a77560146501eAEB5e6D5B7d8DD1eD23DEfa23",
            "0x6A5848b47f5810281a2c225F70C9450000C63147",
            "0xDbb5B14e31560FEA965a1709b71e5c6B8f04FbCF",
            "0xDC4471ee9DFcA619Ac5465FdE7CF2634253a9dc6",
            "0xb3E4cED9b4Ad04cB82d7FF8d802E7907B0B604e5",
            "0x8c4A662711AeDD22Bca4a562987BBcC99a640604",
            "0x7e59DDe2ee81595574DDd55C98300B81467A3618",
            "0x537265E3Fa15C839E445A483e8428e2Dd627d00c",
            "0x78A42a84bFE3E173C3A9246b3F5F1c5Aa8BBaE72",
        ]
    }

    execute_query_client = api_client.create_execute_query_object(
        query=queryBulk, variables=variables
    )
    query_response = await execute_query_client.execute_paginated_query()

    if query_response.has_next_page:
        next_page_response = await query_response.get_next_page

    if next_page_response.has_prev_page:
        prev_page_response = await next_page_response.get_prev_page

    data = json.dumps(query_response.data)
    print(data)
    return jsonify({"data": data, "error": query_response.error})


if __name__ == "__main__":
    app.run(debug=True)

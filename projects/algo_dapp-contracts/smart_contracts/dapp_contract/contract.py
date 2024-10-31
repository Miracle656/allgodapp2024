from algopy import ARC4Contract, String
from algopy.arc4 import abimethod


# class DappContract(ARC4Contract):
#     @abimethod()
#     def hello(self, name: String) -> String:
#         return "Hello, " + name


class DappContract(ARC4Contract):

    did: String
    public_key: String
    
    #create the app
    @abimethod(allow_actions=["NoOp"], create="require")
    def creatApplication(self, did: String, public_key: String) -> None:
        self.did = did
        self.public_key = public_key
    

    @abimethod()
    def register_identity(self, did: String, public_key: String) -> String:
        key_val: dict[String, String] = {
            'myexample.algo': 'algo1234567890'
        }
        if len(key_val) != 0:
            return "DID: " + did + " is already registered"

        key_val[public_key] = did
        return "DID successfully registerd: " + did

# class DappContract(ARC4Contract):

#     global_state = GlobalState(str)

#     def __init__(self) -> None:
#         super().__init__()

#         self.did_key = self.global_state.key("did_key")

#         self.public_key = self.global_state.key("public_key")

#     @abimethod()
#     def register_identity(self, did: String, public_key: String) -> str:
#         if self.did_key.has(did):
#             return "DID already registered"

#         self.did_key.set(did, public_key)
#         return "Identity registered with DID:" + str(did) +  "and public key:" + str(public_key)

pragma solidity ^0.5.5;

//In Solidity constant functions are functions, that are promised not to modify the state.
//view can be considered as the subset of constant that will read the storage(hence viewing).
//pure can be considered as the subset of constant where the return value will only be determined by it's parameters(input values).
//pure is more restrictive than view.

// public - all can access
// external - Cannot be accessed internally, only externally
// internal - only this contract and contracts deriving from it can access
// private - can be accessed only from this contract

contract Degrees {
    address private owner;
    uint private k = 2;// the required amount of signatures to be considered a graduate

    // the string will be the hash of the graduates info
    // uint[] is an array of professor's indexes that signed the graduation of a give student.
    mapping(string => uint[]) public graduates;

    // this version wastes memory and storage for no reason
    // mapping(string => Professor[]) public graduates;

    Professor[] public professors;

    struct Professor {
        address profAddress;
        string name;
        uint id;
    }


    //- EVENTS -//
    event newProfessorRegistered(uint id);

    event profAttemptedToSignMoreThanOnce(
        string _name
        );

    event newGraduateSignature(
        string indexed _hash, // indexed allows a student to filter events to a certain hash (his own)
        string _name
        );


    //- MODIFIERS -//
    modifier isOwner() {
        require(msg.sender == owner, "You are not the contract's owner");
        _; // _; tells us where the body of the caller function will be injected
    }

    modifier isProf() {
        bool b = false;
        address s = msg.sender;
        for(uint8 i = 0; i<professors.length; i++){
            if(professors[i].profAddress == s){
                b = true;
            }
        }
        require(b,"Not a Professor");
        _;
    }



    constructor() public{
        owner = msg.sender;
        addProf(address(0xD2E2434023C5f1211c535D4d833c8501FA4EF232),"mf");
        addProf(address(0xDe99efB18F63233A6368f1BdA14f8Dbe3A4E8FEa),"kanatas");
        addProf(address(0x885772F8CA506B0C3c311e0431C34d9fB08BD271),"xenakis");
        addProf(address(0x722eDE063ee86EA683D30DD33E9b1195bA424A9c),"mhliwnhs");
        addProf(address(0xc5850865722794aBe537d88aa40B830Dc1cb9a09),"lamprinoudakis");
    }

    // this function must only be called at the contract's creation
    function addProf(address _profAddress, string memory _name) private isOwner{
        Professor memory p = Professor({
            profAddress: _profAddress,
            name: _name,
            id: professors.length
        });

        professors.push(p);

        emit newProfessorRegistered(p.id);
    }

    function verifyGraduation(string memory _hash) public view returns(bool){
        uint[] memory approvals = graduates[_hash];
        if(approvals.length >= k){
            return true;
        }
        return false;
    }

    //external functions can only be called outside the contract
    function signGraduation(string calldata hash) external isProf{
        int profIndex = getProfessorIndex();
        require(hasntAlreadySigned(profIndex,hash),"Professor attempted to sign more than once");
        require(profIndex>=0,"Only Professors can sign graduations");
        graduates[hash].push(uint(profIndex));
        emit newGraduateSignature(hash,professors[uint(profIndex)].name);
    }

    function getProfessorIndex() public view isProf returns(int){
        for(uint i = 0; i<professors.length; i++){
            if(professors[i].profAddress == msg.sender){
                return int(i);
            }
        }
        return -1;
    }

    function hasntAlreadySigned(int _profIndex, string memory _hash) internal view returns(bool){
        uint[] memory approvals = graduates[_hash];
        for(uint i = 0; i<approvals.length; i++){
            if(approvals[i] == uint(_profIndex)){
                // emit profAttemptedToSignMoreThanOnce(prof.name);
                return false;
            }
        }
        return true;
    }
}
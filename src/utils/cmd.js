class GameCmd {

    paraCmd = {
        cometLogin: {
            Req_RegAccount: 1,
            Ret_RegAccount: 2,
            Req_LoginAccount: 3,
            Ret_LoginAccount: 4,
            Req_FindPassword: 5,
            Ret_FindPassword: 6,
            LoginError: 10,
            Req_QuickToken: 11,
            Ret_QuickToken: 12,
            Req_QuickLogin: 13,
            Ret_QuickLogin: 14,
            Req_ThirdLogin: 15,
            Ret_ThirdLogin: 16,
            Req_BindAccount: 17,
            Ret_BindAccount: 18,
            Req_Announcement: 19,
            Ret_Announcement: 20,
            Req_GameVersion: 21,
            Ret_GameVersion: 22,
            Req_BiliLogin: 23,
            Ret_BiliLogin: 24,
        },
        cometGate: {
            Ntf_GameTime: 1,
            Req_UserGameTime: 2,
            Ret_UserGameTime: 3,
            LoginGateError: 4,
            LoginGateVerify: 5,
            SelectUserInfoList: 6,
            CreateCharacter: 7,
            EnterGame: 8,
        },
        cometScene: {
            Ret_GameError: 0,
            Ntf_CharacterFullData: 1,
            Req_BeginSong: 2,
            Ret_BeginSong: 3,
            Req_FinishSong: 4,
            Ret_FinishSong: 5,
            Req_SingleSongRank: 6,
            Ret_SingleSongRank: 7,
            Req_RankInfo: 8,
            Ret_RankInfo: 9,
            Req_SetFavorite: 10,
            Ret_SetFavorite: 11,
            Req_BackstageGame: 12,
            Ntf_UpdateInfo: 13,
            Req_ActivityInfo: 14,
            Ret_ActivityInfo: 15,
            Req_ActivityBegin: 16,
            Ret_ActivityBegin: 17,
            Req_ActivityFinish: 18,
            Ret_ActivityFinish: 19,
            Ntf_ActivityChange: 20,
            Req_MailList: 21,
            Ret_MailList: 22,
            Req_GetMailReward: 23,
            Ret_GetMailReward: 24,
            Req_DelMail: 25,
            Ret_DelMail: 26,
            Ntf_DelInfo: 27,
            Req_Guide: 28,
            Ret_Guide: 29,
            Req_GuideClear: 91,
            Ret_GuideClear: 92,
            Req_ChangeHeadIcon: 30,
            Ret_ChangeHeadIcon: 31,
            Req_ChangeCharacter: 32,
            Ret_ChangeCharacter: 33,
            Req_ChangeTheme: 34,
            Ret_ChangeTheme: 35,
            Req_ShopInfo: 36,
            Ret_ShopInfo: 37,
            Req_ShopBuy: 38,
            Ret_ShopBuy: 39,
            Req_PieceExchange: 40,
            Ret_PieceExchange: 41,
            Req_BattleFieldInfo: 42,
            Ret_BattleFieldInfo: 43,
            Req_BattleFieldRankInfo: 44,
            Ret_BattleFieldRankInfo: 45,
            Req_BattleFieldBegin: 46,
            Ret_BattleFieldBegin: 47,
            Req_BattleFieldFinish: 48,
            Ret_BattleFieldFinish: 49,
            Req_SummonInfo: 50,
            Ret_SummonInfo: 51,
            Req_Summon: 52,
            Ret_Summon: 53,
            Req_SummonWeekReward: 54,
            Ret_SummonWeekReward: 55,
            Req_SummonShopBuy: 56,
            Ret_SummonShopBuy: 57,
            Req_ChangeLanguage: 58,
            Ret_ChangeLanguage: 59,
            Req_Social_SearchPlayer: 60,
            Ret_Social_SearchPlayer: 61,
            Req_Social_PlayerProfile: 62,
            Ret_Social_PlayerProfile: 63,
            Req_Social_SendAddFriendRequest: 64,
            Ret_Social_SendAddFriendRequest: 65,
            Ntf_Social_AddFriendRequest: 66,
            Req_Social_DelFriend: 67,
            Ret_Social_DelFriend: 68,
            Ntf_Social_DelFriend: 69,
            Req_Social_DisposeFriendRequest: 70,
            Ret_Social_DisposeFriendRequest: 71,
            Ntf_Social_DisposeFriendRequest: 72,
            Req_Social_PublishDynamics: 73,
            Ret_Social_PublishDynamics: 74,
            Req_Social_DelDynamics: 75,
            Ret_Social_DelDynamics: 76,
            Req_Social_FriendDynamics: 77,
            Ret_Social_FriendDynamics: 78,
            Ntf_Social_FriendPublicDynamic: 79,
            Ntf_Social_FriendStatus: 80,
            Req_Story_Info: 81,
            Ret_Story_Info: 82,
            Req_Story_Finish: 83,
            Ret_Story_Finish: 84,
            Req_UseItem: 85,
            Ret_UseItem: 86,
            Req_Arcade_Info: 87,
            Ret_Arcade_Info: 88,
            Req_Arcade_Finish: 89,
            Ret_Arcade_Finish: 90,
            Req_ChangeTitle: 97,
            Ret_ChangeTitle: 98,
            Ret_Event_GetCommon: 99,
            Req_Event_Info: 100,
            Ret_Event_Info: 101,
            Req_Event_LevelGift: 102,
            Req_Event_Stamina: 103,
            Req_Event_NewPlayer: 104,
            Req_Event_WeekCheckin: 105,
            Req_Event_Recharge: 106,
            Ntf_RechangeUpdate: 107,
            Req_Event_Login: 108,
            Req_Event_NewCharLogin: 109,
            Req_Event_NewThemeLogin: 110,
            Req_Event_NewCharRelease: 111,
            Req_Event_NewThemeRelease: 112,
            Ntf_Event_NewReleaseUpdate: 113,
            Req_Event_Friend: 114,
            Req_Event_Bili: 115,
            Req_Team_Create: 120,
            Ret_Team_Create: 121,
            Req_Team_Search: 122,
            Ret_Team_Search: 123,
            Req_Team_List: 124,
            Ret_Team_List: 125,
            Req_Team_Apply: 126,
            Ret_Team_Apply: 127,
            Req_Team_Declaration: 128,
            Ret_Team_Declaration: 129,
            Req_Team_Info: 130,
            Ret_Team_Info: 131,
            Req_Team_Position: 132,
            Ret_Team_Position: 133,
            Req_Team_ApplyList: 134,
            Ret_Team_ApplyList: 135,
            Req_Team_DealApply: 136,
            Ret_Team_DealApply: 137,
            Req_Team_Kick: 138,
            Ret_Team_Kick: 139,
            Req_Team_Exit: 140,
            Ret_Team_Exit: 141,
            Req_Team_Logs: 142,
            Ret_Team_Logs: 143,
            Ntf_Team_Change: 144,
            Ntf_Team_InfoChange: 145,
            Ntf_Team_ApplyChange: 146,
            Req_Team_UploadSong: 147,
            Ret_Team_UploadSong: 148,
            Req_Team_ConfimUploadSong: 149,
            Ret_Team_ConfimUploadSong: 150,
            Req_Team_BuyItem: 151,
            Ret_Team_BuyItem: 152,
            Ntf_Team_BuffList: 153,
            Req_PreRank_Info: 160,
            Ret_PreRank_Info: 161,
            Req_PreRank_Begin: 162,
            Ret_PreRank_Begin: 163,
            Req_PreRank_End: 164,
            Ret_PreRank_End: 165,
            Req_PreRank_RankList: 166,
            Ret_PreRank_RankList: 167,
            Req_PVP_BeginMatching: 170,
            Ret_PVP_BeginMatching: 171,
            Req_PVP_EndMatching: 172,
            Ret_PVP_EndMatching: 173,
            Ntf_PVP_MatchSuccess: 174,
            Req_PVP_MatchConfim: 175,
            Ret_PVP_MatchConfim: 176,
            Ntf_PVP_MatchConfim: 177,
            Ntf_PVP_StartLoading: 178,
            Req_PVP_FinishLoading: 179,
            Ntf_PVP_FinishLoading: 180,
            Ntf_PVP_StartGame: 181,
            Req_PVP_SyncScore: 182,
            Ntf_PVP_SyncScore: 183,
            Req_PVP_UseSkill: 184,
            Ntf_PVP_UseSkill: 185,
            Req_PVP_FinishGame: 186,
            Ntf_PVP_FinishGame: 187,
            Req_PVP_CurState: 188,
            Ret_PVP_CurState: 189,
            Req_BuyProduct: 231,
            Ret_BuyProduct: 232,
            Req_VerifyIOSReceipt: 233,
            Ret_VerifyIOSReceipt: 234,
            Req_MissingOrder: 235,
            Ret_MissingOrder: 236,
            Req_SendOrder: 237,
            Ret_SendOrder: 238,
            Req_VerifyGooglePay: 239,
            Ret_VerifyGooglePay: 240,
            Req_IOSAppReceipt: 241,
            Ret_IOSAppReceipt: 242,
            Req_TestVerify: 243,
            Ret_TestVerify: 244,
        },
    };

    mainCmd = {
        Time: 1,
        Login: 2,
        Select: 3,
        Game: 5,
    };

    _link = {
        'Time': 'cometLogin',
        'Login': 'cometScene',
        'Select': 'cometGate',
        'Game': 'cometGate',
    };

    _cmdCache = {};

    constructor() {
        for (let key in this._link) {
            this._cmdCache[this.mainCmd[key]] = this._invert(this._link[key]);
        }
    }

    _invert(pkg) {
        const obj = this.paraCmd[pkg];
        const ret = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                ret[obj[key]] = `${pkg}.${key}`;
        }
        return ret;
    }

    lookupType(main, para) {
        return this._cmdCache[main][para];
    }
}

module.exports = new GameCmd();

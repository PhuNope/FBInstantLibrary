declare const FBInstant: any;

class GraphAPI {
    /**
     * @vn Thực hiện lệnh gọi API đồ thị và trả về kết quả.
     * @param path Đường dẫn API biểu đồ để thực hiện yêu cầu.
     * @method string? Phương thức HTTP sẽ được sử dụng cho yêu cầu này. GET là mặc định nếu không được chỉ định.
     * @params Object? Các tham số sẽ được gửi như một phần của yêu cầu.
     * @returns Trả về Promise<Object> kết quả của lệnh gọi API đồ thị.
     * 
     * @en Performs a graph API Call and returns the result.
     * @param path string The graph API path to perform the request against. 
     * @method string? HTTP method that will be used for this request. GET is the default if not specified.
     * @params Object? Parameters that will be sent as part of the request.
     * @returns Promise<Object> the result of the graph API call.
     */
    requestAsync<T extends Object>(path: string): Promise<T> {
        return new Promise((resolve, reject) => {
            FBInstant.graphApi.requestAsync(path)
                .then((response: T) => {
                    resolve(response);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

type Tournament = {
    id: string,
    name: string,
    description: string,
    startTime: Date,
    customUpdate: string[];
};
class Tournaments {

    /**
     * @vn Đăng điểm của người chơi lên Facebook. API này chỉ nên được gọi trong bối cảnh giải đấu khi kết thúc hoạt động (ví dụ: khi người chơi không còn "mạng sống" để tiếp tục trò chơi). API này sẽ bị giới hạn tốc độ khi được gọi quá thường xuyên. Điểm được đăng bằng API này phải nhất quán và có thể so sánh được giữa các phiên trò chơi. Ví dụ: nếu Người chơi A đạt được 200 điểm trong một phiên và Người chơi B đạt được 320 điểm trong một phiên, thì hai điểm số đó phải được tạo từ các hoạt động mà điểm số được so sánh và xếp hạng với nhau một cách công bằng.
     * @param score Một giá trị số nguyên biểu thị điểm số của người chơi khi kết thúc một hoạt động.
     * @returns Promise sẽ được giải quyết khi hoàn thành bài đăng điểm.
     * @example onScore(score) {
                    if (score > bestScore) {
                        bestScore = score;
                        FBInstant.tournament.postScoreAsync(bestScore)
                            .then(function() {
                        });
                    }
                }
     * 
     * @en Posts a player's score to Facebook. This API should only be called within a tournament context at the end of an activity (example: when the player doesn't have "lives" to continue the game). This API will be rate-limited when called too frequently. Scores posted using this API should be consistent and comparable across game sessions. For example, if Player A achieves 200 points in a session, and Player B achieves 320 points in a session, those two scores should be generated from activities where the scores are fair to be compared and ranked against each other.
     * @param score An integer value representing the player's score at the end of an activity.
     * @returns Returns Promise A promise that resolves when the score post is completed.
     */
    postScoreAsync(score: number): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.tournament.postScoreAsync(score)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    };

    /**
     * @vn Mở hộp thoại tạo giải đấu nếu người chơi hiện không tham gia phiên giải đấu.
     * @param payload Tạo TournamentPayload
     * @returns Promise<Tournaments.Tournament>
     * 
     * @en Opens the tournament creation dialog if the player is not currently in a tournament session.
     * @param payload CreateTournamentPayload
     * @returns Promise<Tournaments.Tournament>
     */
    createAsync(payload: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            FBInstant.tournament.createAsync(payload)
                .then((tournament: any) => {
                    resolve(tournament);
                })
                .catch(() => {
                    reject();
                });
        });
    };

    /**
     * @vn Mở hộp thoại chia sẻ lại giải đấu nếu người chơi hiện đang tham gia một phiên giải đấu.
     * @param payload ShareTournamentPayload Chỉ định nội dung chia sẻ. Xem ví dụ để biết chi tiết.
     * @returns Promise sẽ giải quyết nếu giải đấu được chia sẻ hoặc từ chối nếu không.
     * @example 
     * FBInstant.tournament.shareAsync({
            score: 3,
            data: { myReplayData: '...' }
            }).then(function() {
            // continue with the game.
        });
    
     * @en Opens the reshare tournament dialog if the player is currently in a tournament session.
     * @param payload ShareTournamentPayload Specifies share content. See example for details.
     * @returns Promise A promise that resolves if the tournament is shared, or rejects otherwise.
     */
    shareAsync(payload: Object): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.tournament.shareAsync(payload).then(() => {
                resolve();
            }).catch(() => {
                reject();
            });
        });
    };

    /**
     * @vn Yêu cầu chuyển sang bối cảnh giải đấu cụ thể. Nếu người chơi không phải là người tham gia giải đấu hoặc không có bất kỳ người chơi được kết nối nào tham gia giải đấu, điều này sẽ bị từ chối. Nếu không, lời hứa sẽ giải quyết khi trò chơi đã chuyển sang ngữ cảnh được chỉ định.
     * @param id ID giải đấu mong muốn để chuyển sang.
     * @returns Promise sẽ giải quyết khi trò chơi đã chuyển sang bối cảnh giải đấu được chỉ định hoặc từ chối nếu không.
     * 
     * @en Request a switch into a specific tournament context. If the player is not a participant of the tournament, or there are not any connected players participating in the tournament, this will reject. Otherwise, the promise will resolve when the game has switched into the specified context.
     * @param id The Tournament ID of the desired context to switch into.
     * @returns A promise that resolves when the game has switched into the specified tournament context, or rejects otherwise.
     */
    joinAsync(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.tournament
                .joinAsync(id)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    };

    /**
     * @vn Trả về danh sách các giải đấu đủ điều kiện có thể xuất hiện trong trò chơi, bao gồm các giải đấu 1) người chơi đã tạo; 2) người chơi đang tham gia; 3) bạn bè của người chơi (người đã cấp phép) đang tham gia. Các giải đấu ngay lập tức được trả lại đang hoạt động. Một giải đấu ngay lập tức sẽ hết hạn nếu thời gian kết thúc của nó ở trong quá khứ. Đối với mỗi giải đấu tức thời, chỉ có một ID ngữ cảnh duy nhất được liên kết với nó và ID đó không thay đổi.
     * @returns Promise<Array<Tournaments.Tournament>>
     */
    getTournamentsAsync<T extends Tournament>(): Promise<Array<T>> {
        return new Promise((resolve, reject) => {
            FBInstant.tournament.getTournamentsAsync()
                .then((tournaments: Array<T>) => {
                    resolve(tournaments);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

class Inventory {
    /**
     * @vn [ĐANG ĐÓNG CỬA THỬ NGHIỆM] API này đại diện cho một mẫu cho các mục có thể mở khóa. Tính năng này hiện đang trong giai đoạn thử nghiệm và việc sử dụng nó sẽ sớm được mở rộng.
     * @param unlockableItemConfig Chi tiết cấu hình của vật phẩm có thể mở khóa.
     * @returns Promise<UnlockableItemStat> Promise sẽ được thực hiện khi người chơi có thể mở khóa vật phẩm. Nếu không, nó từ chối.
     * 
     * @en [IN CLOSED BETA] This API represents a template for unlockable items. This feature is currently in beta and its usage will expand soon.
     * @param unlockableItemConfig The unlockable item's configuration details.
     * @returns Promise<UnlockableItemStat> A Promise that resolves when the item is unlockable for the player. Otherwise, it rejects.
     */
    unlockItemAsync<T extends Object>(unlockableItemConfig: T): Promise<Object> {
        return new Promise((resolve, reject) => {
            FBInstant.inventory.unlockItemAsync(unlockableItemConfig)
                .then((unlockableItemStat: Object) => {
                    resolve(unlockableItemStat);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

type ConnectedPlayer = {
    getID(): string,
    getName(): string;
};

class Player {
    /**
     * @en A unique identifier for the player. A Facebook user's player ID will remain constant, and is scoped to a specific game. This means that different games will have different player IDs for the same user. This function should not be called until FBInstant.initializeAsync() has resolved.
     * @returns string? A unique identifier for the player.
     */
    getID(): string {
        return FBInstant.player.getID();
    }

    /**
     * @en A unique identifier for the player. This is the standard Facebook Application-Scoped ID which is used for all Graph API calls. If your game shares an AppID with a native game this is the ID you will see in the native game too.
     * @returns Promise<string?> A unique identifier for the player.
     */
    getASIDAsync(): Promise<string> {
        return new Promise((resolve, reject) => {
            FBInstant.player.getASIDAsync()
                .then((asid: string) => {
                    resolve(asid);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en A unique identifier for the player. This is the standard Facebook Application-Scoped ID which is used for all Graph API calls. If your game shares an AppID with a native game this is the ID you will see in the native game too.
     * @returns Promise<SignedASID?> A promise that resolves with a SignedASID object.
     */
    getSignedASIDAsync<T extends Object>(): Promise<T> {
        return new Promise((resolve, reject) => {
            FBInstant.player.getSignedASIDAsync()
                .then((result: T) => {
                    resolve(result);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Fetch the player's unique identifier along with a signature that verifies that the identifier indeed comes from Facebook without being tampered with. This function should not be called until FBInstant.initializeAsync() has resolved.
     * @param requestPayload string? A developer-specified payload to include in the signed response.
     * @returns Promise<SignedPlayerInfo> A promise that resolves with a SignedPlayerInfo object.
     */
    getSignedPlayerInfoAsync<T extends Object>(requestPayload: string): Promise<T> {
        return new Promise((resolve, reject) => {
            FBInstant.player.getSignedPlayerInfoAsync(requestPayload)
                .then((result: T) => {
                    // The verification of the ID and signature should happen on server side.
                    resolve(result);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Returns a promise that resolves with whether the player can subscribe to the game bot or not.
     * @returns Promise<boolean> Whether a player can subscribe to the game bot or not. Developer can only call subscribeBotAsync() after checking canSubscribeBotAsync(), and the game will only be able to show the player their bot subscription dialog once per week.
     */
    canSubscribeBotAsync(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            FBInstant.player.canSubscribeBotAsync()
                .then((can_subscribe: boolean) => {
                    resolve(can_subscribe);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Request that the player subscribe the bot associated to the game. The API will reject if the subscription fails - else, the player will subscribe the game bot.
     * @returns Promise A promise that resolves if player successfully subscribed to the game bot, or rejects if request failed or player chose to not subscribe.
     */
    subscribeBotAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.player.subscribeBotAsync()
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en The player's localized display name. This function should not be called until FBInstant.initializeAsync() has resolved.
     * @returns string? The player's localized display name.
     */
    getName(): string {
        return FBInstant.player.getName();
    }

    /**
     * @example var playerImage = new Image();
    playerImage.crossOrigin = 'anonymous';
    // This function should be called after FBInstant.initializeAsync()
    // resolves.
    playerImage.src = FBInstant.player.getPhoto();
     * @en A url to the player's public profile photo. The photo will always be a square, and with dimensions of at least 200x200. When rendering it in the game, the exact dimensions should never be assumed to be constant. It's recommended to always scale the image to a desired size before rendering. The value will always be null until FBInstant.initializeAsync() resolves.

    WARNING: Due to CORS, using these photos in the game canvas can cause it to be tainted, which will prevent the canvas data from being extracted. To prevent this, set the cross-origin attribute of the images you use to 'anonymous'.
     * @returns string? Url to the player's public profile photo.
     */
    getPhoto(): string {
        return FBInstant.player.getPhoto();
    }

    /**
     * @en Retrieve data from the designated cloud storage of the current player. Please note that JSON objects stored as string values would be returned back as JSON objects.
     * @param keys Array<string> An array of unique keys to retrieve data for.
     * @returns Promise<Object> A promise that resolves with an object which contains the current key-value pairs for each key specified in the input array, if they exist.
     */
    getDataAsync<T extends string>(key: Array<T>): Promise<{ [K in T]: any }> {
        return new Promise((resolve, reject) => {
            FBInstant.player
                .getDataAsync(key)
                .then((data) => {
                    resolve(data);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Set data to be saved to the designated cloud storage of the current player. The game can store up to 1MB of data for each unique player.
     * @param data Object An object containing a set of key-value pairs that should be persisted to cloud storage. The object must contain only serializable values - any non-serializable values will cause the entire modification to be rejected.
     * @returns Promise A promise that resolves when the input values are set. NOTE: The promise resolving does not necessarily mean that the input has already been persisted. Rather, it means that the data was valid and has been scheduled to be saved. It also guarantees that all values that were set are now available in player.getDataAsync.
     */
    setDataAsync(data: Object): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.player
                .setDataAsync(data)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Immediately flushes any changes to the player data to the designated cloud storage. This function is expensive, and should primarily be used for critical changes where persistence needs to be immediate and known by the game. Non-critical changes should rely on the platform to persist them in the background. NOTE: Calls to player.setDataAsync will be rejected while this function's result is pending.
     * @returns Promise A promise that resolves when changes have been persisted successfully, and rejects if the save fails.
     */
    flushDataAsync(): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.player.flushDataAsync()
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Fetches an array of ConnectedPlayer objects containing information about active players (people who played the game in the last 90 days) that are connected to the current player.
     * @returns Promise<Array<ConnectedPlayer>> A promise that resolves with a list of connected player objects. NOTE: This function should not be called until FBInstant.initializeAsync() has resolved.
     */
    getConnectedPlayersAsync(): Promise<Array<ConnectedPlayer>> {
        return new Promise((resolve, reject) => {
            FBInstant.player.getConnectedPlayersAsync()
                .then((players) => {
                    resolve(players);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

type ContextSizeResponse = {
    answer: boolean,
    minSize: number,
    maxSize: number;
};

type ContextFilter = "NEW_CONTEXT_ONLY" | "INCLUDE_EXISTING_CHALLENGES" | "NEW_PLAYERS_ONLY";

type OptionsChooseAsync = { filters?: [ContextFilter], maxSize?: number, minSize?: number; };

/**
 * @en Represents information about a player who is in the context that the current player is playing in.
 */
interface ContextPlayer {
    // player: PlayerData;
    player: any;

    /**
     * @en Get the id of the context player.
     * @returns string The ID of the context player
     */
    getID(): string;

    /**
     * @en Get the player's localized display name.
     * @returns string? The player's localized display name.
     */
    getName(): string;

    /**
     * @en Get the player's public profile photo.
     * @returns string? A url to the player's public profile photo
     */
    getPhoto(): string;
};

class Context {
    /**
     * @en A unique identifier for the current game context. This represents a specific context that the game is being played in (for example, a facebook post). The identifier will be null if game is being played in a solo context. This function should not be called until FBInstant.startGameAsync has resolved.
     * @returns string? A unique identifier for the current game context.
     */
    getID(): string {
        return FBInstant.context.getID();
    }

    /**
     * @en The type of the current game context. POST - A facebook post. THREAD - A chat thread. GROUP - A facebook group. SOLO - Default context, where the player is the only participant.

    This function should not be called until FBInstant.startGameAsync has resolved.

    @returns ("POST" | "THREAD" | "GROUP" | "SOLO") Type of the current game context.
     */
    getType(): "POST" | "THREAD" | "GROUP" | "SOLO" {
        return FBInstant.context.getType();
    }

    /**
     * @en This function determines whether the number of participants in the current game context is between a given minimum and maximum, inclusive. If one of the bounds is null only the other bound will be checked against. It will always return the original result for the first call made in a context in a given game play session. Subsequent calls, regardless of arguments, will return the answer to the original query until a context change occurs and the query result is reset. This function should not be called until FBInstant.startGameAsync has resolved.
     * @param minSize number? The maximum bound of the context size query.
     * @param maxSize number?
     * @returns (ContextSizeResponse | null)
     */
    isSizeBetween(minSize: number | null, maxSize?: number | null): ContextSizeResponse | null {
        return FBInstant.context.isSizeBetween(minSize, maxSize);
    }

    /**
     * @en Request a switch into a specific context. If the player does not have permission to enter that context, or if the player does not provide permission for the game to enter that context, this will reject. Otherwise, the promise will resolve when the game has switched into the specified context.
     * @param id string ID of the desired context or the string SOLO to switch into a solo context.
     * switchSilentlyIfSolo boolean If switching into a solo context, set this to true to switch silently, with no confirmation dialog or toast. This only has an effect when switching into a solo context. (optional, default false).
     * @returns Promise A promise that resolves when the game has switched into the specified context, or rejects otherwise.
     */
    switchAsync(id: string): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.context
                .switchAsync(id)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Opens a context selection dialog for the player. If the player selects an available context, the client will attempt to switch into that context, and resolve if successful. Otherwise, if the player exits the menu or the client fails to switch into the new context, this function will reject.
     * @param options options Object? An object specifying conditions on the contexts that should be offered.
    
    options.filters Array<ContextFilter>? The set of filters to apply to the context suggestions.

    options.maxSize number? The maximum number of participants that a suggested context should ideally have.

    options.minSize number? The minimum number of participants that a suggested context should ideally have.
     * @returns Promise A promise that resolves when the game has switched into the context chosen by the user. Otherwise, the promise will reject (if the user cancels out of the dialog, for example).
     */
    chooseAsync(options?: OptionsChooseAsync): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.context
                .chooseAsync(options)
                .then(() => {
                    resolve();
                }).
                catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Attempts to create a context between the current player and a specified player or a list of players. This API supports 3 use cases: 1) When the input is a single playerID, it attempts to create or switch into a context between a specified player and the current player 2) When the input is a list of connected playerIDs, it attempts to create a context containing all the players 3) When there's no input, a friend picker will be loaded to ask the player to create a context with friends to play with

     For each of these cases, the returned promise will reject if any of the players listed are not Connected Players of the current player, or if the player denies the request to enter the new context. Otherwise, the promise will resolve when the game has switched into the new context.
     * @param suggestedPlayerIDs (string | Array<string>)?

      null (string | Array<String>) ?suggestedPlayerIDs A list of game suggested playerIDs or a single suggested playerID or no input.
     * @returns Promise A promise that resolves when the game has switched into the new context, or rejects otherwise.
     */
    createAsync(suggestedPlayerIDs?: string | Array<string>): Promise<void> {
        return new Promise((resolve, reject) => {
            FBInstant.context
                .createAsync(suggestedPlayerIDs)
                .then(() => {
                    resolve();
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Gets an array of ContextPlayer objects containing information about active players in the current context (people who played the game in the current context in the last 90 days). This may include the current player.
     * @returns Promise<Array<ContextPlayer>>
     */
    getPlayersAsync(): Promise<Array<ContextPlayer>> {
        return new Promise((resolve, reject) => {
            FBInstant.context
                .getPlayersAsync()
                .then((players: ContextPlayer[]) => {
                    resolve(players);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

/**
 * @en Representation of a group of players playing together in a messenger thread.
 */
interface GamingSquad {
    // args: GamingSquadArgs;
    args: any;

    /**
     * @en The unique gaming squad ID.
     * @returns string The gaming squad ID
     */
    getID(): string;

    /**
     * @en The gaming squad name.
     * @returns string The name of the squad
     */
    getName(): string;

    /**
    * @en The URI for the gaming squad image.
    * @returns string URI for gaming squad image
    */
    getImage(): string;

    /**
    * @en The unique context ID that is associated with this gaming squad.
    * @returns string The context ID for this gaming squad
    */
    getContextID(): string;

    /**
     * @en Brings up a dialog for the player to join a Squad if they are not part of it. If the user accepts, they become part of the squad thread and the game context switches into the squad. If they are part of the Squad already, the dialog will prompt the user to switch into the Squad context.
     * @returns Promise
     */
    joinAsync(): Promise<any>;

    /**
     * @en Brings up a dialog for the player to confirm if they want to leave the Squad. If the player confirms, they are removed from the Squad and the messenger thread that is associated with this Squad.
     * @returns Promise
     */
    leaveAsync(): Promise<any>;

    /**
     * @en Brings up a dialog for the player to add their friends to the current squad.
     * @returns Promise
     */
    addToSquadAsync(): Promise<any>;
}

class Squad {
    /**
     * @deprecated This function must be called in GamingSquad
     * @en Brings up a dialog for the player to join a Squad if they are not part of it. If the user accepts, they become part of the squad thread and the game context switches into the squad. If they are part of the Squad already, the dialog will prompt the user to switch into the Squad context.
     * @returns Promise
     */
    joinAsync(): any { };

    /**
     * @deprecated This function must be called in GamingSquad
     * @en Brings up a dialog for the player to confirm if they want to leave the Squad. If the player confirms, they are removed from the Squad and the messenger thread that is associated with this Squad.
     * @returns Promise
     */
    leaveAsync(): any { };

    /**
     * @deprecated This function must be called in GamingSquad
     * @en Brings up a dialog for the player to add their friends to the current squad.
     * @returns Promise
     */
    addToSquadAsync(): any { };

    /**
     * @en Brings up a dialog for the player to create a Squad. If the player creates the Squad, the promise will resolve with the new Squad instance and the game session will be switched into this newly created Squad context. The promise will reject if the player closes the dialog instead.
     * @param payload CreateGamingSquadPayload?
     * @returns Promise<GamingSquad>
     */
    createAsync(): Promise<GamingSquad> {
        return new Promise((resolve, reject) => {
            FBInstant.squads.createAsync()
                .then((squad: GamingSquad) => {
                    resolve(squad);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Fetch an existing Squad. If the Squad does not exist, or the player cannot interact with the Squad, this API will reject with the GAMING_SQUAD_NOT_FOUND error code.
     * @param id string The squad ID or context ID.
     * @returns Promise<GamingSquad>
     */
    getAsync(id: string): Promise<GamingSquad> {
        return new Promise((resolve, reject) => {
            FBInstant.squads.getAsync(id)
                .then((squad: GamingSquad) => {
                    resolve(squad);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Fetches the current player's existing squads, if any.
     * @returns Promise<Array<GamingSquad>>
     */
    getPlayerSquadsAsync(): Promise<Array<GamingSquad>> {
        return new Promise((resolve, reject) => {
            FBInstant.squads.getPlayerSquadsAsync()
                .then((squads: GamingSquad[]) => {
                    resolve(squads);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * @en Fetches the current player's existing squads, if any.
     * @returns Promise<boolean> Returns whether the current user is eligible to use squads.
     */
    canUseSquadsAsync(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            FBInstant.squads.canUseSquadsAsync()
                .then((isEligible: boolean) => {
                    resolve(isEligible);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

/**
 * @en Represents a tournament bracket
 */
interface Arena {
    getID(): string;

    getTitle(): string;

    getNumUsersRegistered(): number;

    getStatus(): string;

    getCreationTime(): number;

    /**
     * @en Returns the context ID of the match the player is in for this arena.
     */
    getContextIDForPlayer(): string;

    /**
     * @en Brings up a dialog showing Arena details and prompting the user to register for the Arena if the user is not registered to it already. If the user click on 'Register', they become registered to the Arena, but if the user dimisses the dialog, USER_INPUT error will be thrown.
     * @returns Promise
     */
    registerAsync(): Promise<any>;
}

class Arenas {
    /**
     * @deprecated This function must be called in Arena
     * @en Brings up a dialog showing Arena details and prompting the user to register for the Arena if the user is not registered to it already. If the user click on 'Register', they become registered to the Arena, but if the user dimisses the dialog, USER_INPUT error will be thrown.
     * @returns Promise
     */
    registerAsync(): any { }

    /**
     * @en Fetches the all the NOT_STARTED and RUNNING arenas that belong to the game.
     * @returns Promise<Array<Arena>>
     */
    getArenasAsync(): Promise<Array<Arena>> {
        return new Promise((resolve, reject) => {
            FBInstant.arenas.getArenasAsync()
                .then((arenas: Array<Arena>) => {
                    resolve(arenas);
                })
                .catch(() => {
                    reject();
                });
        });
    }
}

class Community {
    /**
     * @en Check if user can get live streams.
     * @returns Promise<boolean> Returns bool for whether user/game can get live streams.
     */
    canGetLiveStreamsAsync(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            FBInstant.community.canGetLiveStreamsAsync()
                .then((data: boolean) => {
                    resolve(data);
                })
                .catch(() => {
                    reject();
                });
        });
    }

    /**
     * 
     */
    canFollowOfficialPageAsync(){
        
    }
}

export class FBInstantLib {

    /**
     * @vn Chứa các chức năng và thuộc tính liên quan đến API Đồ thị.
     * @en Contains functions and properties related to Graph APIs.
     */
    graphApi: GraphAPI;

    /**
     * @vn Chứa các chức năng và thuộc tính liên quan đến các giải đấu tức thời.
     * @en Contains functions and properties related to instant tournaments.
     */
    tournament: Tournaments;

    /**
     * @vn [ĐANG ĐÓNG CỬA BETA] Chứa các chức năng và thuộc tính liên quan đến khoảng không quảng cáo của trò chơi.
     * @en [IN CLOSED BETA] Contains functions and properties related to game inventory.
     */
    inventory: Inventory;

    /**
     * @vn
     * @en Contains functions and properties related to the current player.
     */
    player: Player;

    /**
     * @en Contains functions and properties related to the current game context.
     */
    context: Context;

    /**
     * @en Contains functions and properties related to gaming squads.
     */
    squads: Squad;

    /**
     * @en Contains functions and properties related to arenas.
     */
    arenas: Arenas;

    /**
     * @en [IN CLOSED BETA] Contains functions and properties related to gaming community.
     */
    community: Community;

    async test() {
        // let a = await this.squads.getAsync("abc");
        // a.
    }
}
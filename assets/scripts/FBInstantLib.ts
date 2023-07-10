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

    async test() {
        let a = await this.tournament.getTournamentsAsync();
        // a[0].
    }
}
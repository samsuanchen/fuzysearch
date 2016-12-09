// convolute.js 全文檢索 fuzzy search 模糊搜尋 

const convolute=function(T,terms,threshold,windowsize,tokenized){
	
	// T 全文, 被搜尋的對象, (純文字或 token 陣列), 例如 13 經
	// terms[t] 單一文字 t (例如 【天】) 在搜尋字樣 (例如 【天子自強不息】) 的中的個數 為 1
	// threshold 被搜尋 文字區段 window 所需比對到的最少字數 (預設為 windowsize 的一半)
	// windowsize 被搜尋 文字區段 window 的指定字數
	// tokenized 若為 true, 表示 被搜尋的對象 為 token 陣列
	
	var score=0, out=[];
	for (var i=0;i<windowsize;i++) {
		var t=T[i];
		if (tokenized) t=t[0];
		if (terms[t]) {
			score++;
		}
	}
    // 若順便紀錄 bestscore 可省掉後續 bestscore 的計算                                ** 02 sam 20161209
	for (var i=windowsize;i<T.length;i++) {
		var head=T[i], tail=T[i-windowsize]; //the term at i
		if (tokenized) {
			head=head[0];
			tail=tail[0];
		}
		if ( terms[head]) score++;  //if the term exists in query
		// 若順便紀錄 bestscore 可省掉後續 bestscore 的計算                            ** 02 sam 20161209
		if (i-windowsize>=0 && terms[tail] ) score--; //term slip out of window

		if (score<threshold) continue; 

		var at=i-windowsize;
		if (at<0) at=0; // at 不可能小於 0, 多此一舉                                   *** 03 sam 20161209
		const prev=out[out.length-1];
		if (prev && at-prev[0]<windowsize ) { //close enought to previous candidate
			if (score>prev[1]) { //update to better score
				out[out.length-1][0]=at;
				out[out.length-1][1]=score;
			}
		} else {
			out.push([at,score]); //we have a candidate
		}
	}
	if (!out.length)return out;

	// out is an array of [token id, score]
	// 若只保留 out 中 score 大於等於 bestscore/1.1 的 可增加 sort 的速度              **** 04 sam 20161209
	out.sort(function(a,b){return b[1]-a[1]});

	//only keep result close enough to best score
	const bestscore=out[0][1]; // 若 bestscore 除以 1.1, , 每次比較可省 score 乘以 1.1 * 01 sam 20161209
	for (var i=1;i<out.length;i++) {
		if (bestscore>out[i][1]*1.1) break; // 每次比較可省 score 乘以 1.1             * 01 sam 20161209
	}
	return out.slice(0,i);
}
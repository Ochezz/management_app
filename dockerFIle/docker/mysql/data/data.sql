INSERT INTO info_tbl 
(id, last_name_furi, first_name_furi, last_name, first_name, postal_num, prefecture_id, city, other_address, tel) 
VALUES 
(1, "ヤマダ", "タロウ", "山田", "太郎", "1111111", "東京都", "品川区", "西五反田１丁目五反田ＡＡビル", "09011111111"),
(2, "カワグチ", "ケンジ", "川口", "健二", "2222222", "東京都", "板橋区", "西五反田２丁目五反田ＢＢビル", "09022222222"),
(3, "ハリモト", "ユキ", "張本", "有希", "3333333", "東京都", "豊島区","西五反田３丁目五反田ＣＣビル", "09033333333");

INSERT INTO result_tbl
(id, info_id, checkTime, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10)
VALUES
(1, 1, null, null, null, null, null, null, null, null, null, null, null),
(2, 2, null, null, null, null, null, null, null, null, null, null, null),
(3, 3, null, null, null, null, null, null, null, null, null, null, null),
(4, 4, now(), true, true, false, false, false, null, null, null, null, null),
(5, 5, null, null, null, null, null, null, null, null, null, null, null);

INSERT INTO question_tbl
(id, text)
VALUES
(1, "現在体温が３７．５℃以上ですか？"),
(2, "平熱を超える発熱がありますか？"),
(3, "咳、のどの痛みなど風邪の症状がありますか？"),
(4, "だるさ、息苦しさがありますか？"),
(5, "嗅覚や味覚の異常がありますか？");
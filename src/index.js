const userSeq = (() => {
  let current = 1;
  return () => {
    return current++;
  };
})();

// プロパティの値の組み合わせを網羅したオブジェクトリストを生成する
//Object.keys()=キーを取得する関数
//map()=連想配列を作れる
const makeCombination = (combinationPetterns) => {
  const props = Object.keys(combinationPetterns).map((key) => ({
    name: key,
    values: combinationPetterns[key]
  }));

  console.log("FirstProps", props);
  /*
  [
    {
      name: "Gender"
      values: ["Male","Female"]
    },
    {
      name: "Married",
      values: ["Yes","No"]
    },
  ]
  */

  // 繰り返し処理の部分
  // ...comb=引数を可変にする
  const makeCombinationTwoObjects = (combs, prop) =>
    // reduce(comb, [{}])にすることで、結果をそのままreturnできる
    combs.reduce(
      (arr, comb) =>
        // concatを使うことで同じ階層に配置可能
        arr.concat(
          prop.values.map((value) => ({ ...comb, [prop.name]: value }))
        ),
      []
    );

  console.log("FunctionProps", props);
  /*
  [
    {
      name: "Gender"
      values: ["Male","Female"]
    },
    {
      name: "Married",
      values: ["Yes","No"]
    },
  ]
  */
  console.log("props.reduce", props.reduce(makeCombinationTwoObjects, [{}]));
  /*
[
  {
    gender:Male,
    Children:Yes,
    Age:5
  },
  {
    gender:Male,
    Children:Yes,
    Age:15
  },
]
*/

  return props.reduce(makeCombinationTwoObjects, [{}]);
};
// 全ての組み合わせパターンの匿名ユーザを作成する
const users = makeCombination({
  Gender: ["Male", "Female"],
  Married: ["Yes", "No"],
  Children: ["Yes", "No"],
  Age: [5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115]
}).map((v) => ({ USER_ID: userSeq(), ...v }));

console.log("users", users);
/*
[
  {
    USER_ID: 1,
    gender:Male,
    Children:Yes,
    Age:5
  },
  {
    USER_ID: 2,
    gender:Male,
    Children:Yes,
    Age:15
  }
]
*/

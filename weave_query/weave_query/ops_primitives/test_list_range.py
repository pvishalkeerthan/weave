import weave_query as weave


def test_range():
    assert weave.use(weave_query.weave_query.ops.range(0, 3, 1)).to_pylist_tagged() == [
        0,
        1,
        2,
    ]

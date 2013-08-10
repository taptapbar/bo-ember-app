class BigObjectViewsController < ApplicationController
  def index
    render json: {
      'big_object_views' => [
        { 
          'id' => '1',
          'title' => 'Graph',
          'measure' => 'Revenue',
          'dimensions' => ['Gender', 'Country', 'Age']
        },
        { 
          'id' => '2',
          'title' => 'Graph 2',
          'measure' => 'Sales',
          'dimensions' => ['Income', 'Country']
        },
        { 
          'id' => '3',
          'title' => 'Graph 3',
          'measure' => 'Revenue',
          'dimensions' => ['Continent', 'Age']
        },
        { 
          'id' => '4',
          'title' => 'Graph 4',
          'measure' => 'Cost',
          'dimensions' => ['Income', 'Age', 'Country']
        },
        { 
          'id' => '5',
          'title' => 'Graph 5',
          'measure' => 'Sales',
          'dimensions' => ['Age', 'Continent']
        }
      ]
    }
  end
  
  def create
    if ['1', '2', '3', '4', '5'].include? params['big_object_view']['id']
      render json: nil, status: :unprocessable_entity
    else    
      render json: {
        'big_object_view' => {
          'id'    => "8712861876",
          'title' => "Graph From Server",
            'measure' => 'Revenue',
            'dimensions' => ['Age', 'dimension-b', 'dimension-c']
        }
      }, status: :ok
    end
  end
  
  def show
    request_id = params['id']
    if ['1', '2', '3', '4', '5'].include? request_id
      render json: {
        'big_object_view' => {
          'id'    => request_id,
          'title' => "Graph #{request_id}",
            'measure' => 'Revenue',
            'dimensions' => ['Age', 'dimension-b', 'dimension-c']
        }
      }
    else
      render json: nil, status: :unprocessable_entity
    end
  end
  
  def update
    render json: nil, status: :ok
  end

  def destroy
    render json: nil, status: :ok
  end

  def new_id
    render json: nil, status: :ok
  end

  def dimensions_and_measures
    render json: {
      #'dimensions' => {
      #  'CAT-A' => ['a', 'b', 'c', 'd'], 
      #  'CAT-B' => ['d', 'e', 'f', 'g', 'h', 'i', 'j'], 
      #  'CAT-C' => ['k', 'l', 'm']
      #},
      'dimensions' => [
        { name: 'CATEGORY-A', sub_dimensions: ['Age', 'Gender', 'Income', 'Longlonglonglonglonglong']}, 
        { name: 'CATEGORY-B', sub_dimensions: ['Continent', 'Region', 'Country', 'Age']}, 
        #{ name: 'CAT-C', sub_dimensions: ['k', 'l', 'm']}
      ],
      'measures' => ['Revenue', 'Cost', 'Sales', 'longlonglonglonglonglong', 'Revenue', 'Cost', 'Sales', 'longlonglonglonglonglong', 'Revenue', 'Cost', 'Sales', 'longlonglonglonglonglong', 'Revenue', 'Cost', 'Sales', 'longlonglonglonglonglong']
    }
  end

  def filter_list
    render json: {
      'filter_list' => [
        { name: 'Dimension-A', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d', 'sub-e']},
        { name: 'Dimension-B', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d', 'sub-e', 'sub-f', 'sub-g', 'sub-h', 'sub-i', 'sub-j', 'sub-k', 'sub-l', 'sub-m', 'sub-n', 'sub-o']},
        { name: 'Dimension-C', sub_filters: ['sub-a', 'sub-b', 'sub-c', 'sub-d']}        
      ]
    }
  end

  def fetch_chart_data
    render json: {
      "xAxis" => {
          "categories" => [
              "Italy",
              "Senegal",
              "Kenya",
              "Azerbaijan",
              "Syria",
              "Egypt",
              "Macedonia",
              "Kyrgyz Republic",
              "Faroe Islands",
              "Bulgaria",
              "Guernsey",
              "Czech Republic"
          ]
      },
      "series" => [
          {
              "name" => "Pamela",
              "data" => [
                  17,
                  1,
                  18,
                  25,
                  23,
                  7,
                  18,
                  8,
                  10,
                  25,
                  5,
                  21
              ],
              "stack" => "female"
          },
          {
              "name" => "Sanford",
              "data" => [
                  18,
                  3,
                  18,
                  23,
                  8,
                  23,
                  23,
                  1,
                  15,
                  11,
                  5,
                  19
              ],
              "stack" => "male"
          },
          {
              "name" => "Walter",
              "data" => [
                  5,
                  1,
                  1,
                  8,
                  23,
                  13,
                  8,
                  10,
                  12,
                  14,
                  17,
                  2
              ],
              "stack" => "male"
          },
          {
              "name" => "Goodman",
              "data" => [
                  8,
                  10,
                  4,
                  6,
                  8,
                  13,
                  6,
                  19,
                  14,
                  24,
                  23,
                  9
              ],
              "stack" => "male"
          },
          {
              "name" => "Aurora",
              "data" => [
                  21,
                  13,
                  12,
                  8,
                  6,
                  3,
                  17,
                  3,
                  1,
                  24,
                  14,
                  4
              ],
              "stack" => "female"
          },
          {
              "name" => "Rachael",
              "data" => [
                  13,
                  15,
                  22,
                  21,
                  10,
                  24,
                  14,
                  7,
                  9,
                  25,
                  4,
                  10
              ],
              "stack" => "female"
          },
          {
              "name" => "Leona",
              "data" => [
                  1,
                  16,
                  25,
                  19,
                  20,
                  10,
                  1,
                  23,
                  24,
                  13,
                  11,
                  10
              ],
              "stack" => "female"
          },
          {
              "name" => "Leanna",
              "data" => [
                  7,
                  25,
                  14,
                  22,
                  24,
                  2,
                  21,
                  24,
                  23,
                  19,
                  4,
                  8
              ],
              "stack" => "female"
          },
          {
              "name" => "Keller",
              "data" => [
                  6,
                  19,
                  7,
                  15,
                  1,
                  20,
                  6,
                  16,
                  13,
                  23,
                  3,
                  10
              ],
              "stack" => "male"
          },
          {
              "name" => "Bernadine",
              "data" => [
                  7,
                  17,
                  20,
                  4,
                  23,
                  13,
                  15,
                  3,
                  13,
                  21,
                  5,
                  3
              ],
              "stack" => "female"
          },
          {
              "name" => "Rae",
              "data" => [
                  10,
                  25,
                  10,
                  19,
                  11,
                  1,
                  18,
                  10,
                  3,
                  16,
                  20,
                  6
              ],
              "stack" => "female"
          },
          {
              "name" => "Twila",
              "data" => [
                  21,
                  7,
                  16,
                  6,
                  23,
                  1,
                  18,
                  11,
                  6,
                  20,
                  24,
                  21
              ],
              "stack" => "female"
          }
      ],
      "params" => [ {} ]
    }
  end

end